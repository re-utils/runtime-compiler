// node_modules/.upm/@mapl+framework@2.0.1-r-fhvI0Bpap-FZiUQ3eZ7Q/node_modules/@mapl/framework/core/utils.mjs
const get_args$1 = (...args) => args;
const get_args_with_tags = (...tags) => (...args) => tags.concat(args);
const error = get_args_with_tags(6);
// node_modules/.upm/@mapl+framework@2.0.1-r-fhvI0Bpap-FZiUQ3eZ7Q/node_modules/@mapl/framework/core/route.mjs
const get = get_args_with_tags("GET");
const group = get_args$1;
// node_modules/.upm/@mapl+pattern-router@0.1.3-wsOO_06fUBvOkukgmFsbog/node_modules/@mapl/pattern-router/tree/utils.mjs
const group_modifier_end = (path, groupEndIdx) => {
	if (groupEndIdx < path.length) switch (path[groupEndIdx]) {
		case `+`:
		case `*`:
		case `?`: return groupEndIdx + 1;
	}
	return groupEndIdx;
};
const group_delimiter_end = (path, startIdx) => group_modifier_end(path, path.indexOf(`}`, startIdx) + 1);
const unnamed_group_end = (path, startIdx) => {
	let stack = 0;
	while (startIdx < path.length) {
		if (path[startIdx] === `(`) stack++;
		else if (path[startIdx] === `)` && --stack === 0) return group_modifier_end(path, startIdx + 1);
		startIdx++;
	}
	throw new Error(`invalid unnamed group in path: ` + path);
};
const named_group_end = (path, startIdx) => {
	let groupEndIdx = startIdx + 2;
	while (groupEndIdx < path.length) {
		switch (path[groupEndIdx]) {
			case `*`:
			case `+`:
			case `?`: return groupEndIdx + 1;
			case `(`: return unnamed_group_end(path, groupEndIdx);
			case `{`:
			case `}`:
			case `/`:
			case `:`:
			case `.`:
			case `@`:
			case `[`:
			case `]`:
			case `-`:
			case `=`:
			case `%`: return groupEndIdx;
		}
		groupEndIdx++;
	}
	return groupEndIdx;
};
const wildcard_group_end = (path, startIdx) => group_modifier_end(path, path[startIdx] === `/` ? startIdx + 2 : startIdx + 1);
// node_modules/.upm/@mapl+pattern-router@0.1.3-wsOO_06fUBvOkukgmFsbog/node_modules/@mapl/pattern-router/tree/node.mjs
const dict = (key, value) => {
	const v = Object.create(null);
	v[key] = value;
	return v;
};
const node_dict_create = (path, keyStartIdx, keyEndIdx, store) => dict(path.slice(keyStartIdx, keyEndIdx), keyEndIdx === path.length ? [
	``,
	store,
	null,
	null
] : node_create(path, keyEndIdx, store));
const regexp_group_needs_prefixing = (path, pathIdx, firstIdx) => pathIdx > firstIdx && path[pathIdx - 1] === `/` ? 1 : 0;
const is_prefixed_regexp_group = (path, pathIdx) => path[pathIdx] === `/` && pathIdx + 1 < path.length && (path[pathIdx + 1] === `(` || path[pathIdx + 1] === `:` || path[pathIdx + 1] === `*`);
const insert_to_dynamic_node_map = (node, path, keyStartIdx, keyEndIdx, store) => {
	if (node[3] === null) node[3] = node_dict_create(path, keyStartIdx, keyEndIdx, store);
	else {
		const map = node[3], groupKey = path.slice(keyStartIdx, keyEndIdx), connectNode = map[groupKey];
		if (connectNode == null) map[groupKey] = keyEndIdx === path.length ? [
			``,
			store,
			null,
			null
		] : node_create(path, keyEndIdx, store);
		else if (keyEndIdx === path.length) connectNode[1] = store;
		else node_insert(connectNode, path, keyEndIdx, store);
	}
};
const node_create = (path, startIdx, store) => {
	for (let pathIdx = startIdx; pathIdx < path.length; pathIdx++) switch (path[pathIdx]) {
		case `{`: return [
			path.slice(startIdx, pathIdx),
			null,
			null,
			node_dict_create(path, pathIdx + 1, group_delimiter_end(path, pathIdx + 1), store)
		];
		case `(`:
			pathIdx -= regexp_group_needs_prefixing(path, pathIdx, startIdx);
			return [
				path.slice(startIdx, pathIdx),
				null,
				null,
				node_dict_create(path, pathIdx, unnamed_group_end(path, pathIdx), store)
			];
		case `:`:
			pathIdx -= regexp_group_needs_prefixing(path, pathIdx, startIdx);
			return [
				path.slice(startIdx, pathIdx),
				null,
				null,
				node_dict_create(path, pathIdx, named_group_end(path, pathIdx), store)
			];
		case `*`:
			pathIdx -= regexp_group_needs_prefixing(path, pathIdx, startIdx);
			return [
				path.slice(startIdx, pathIdx),
				null,
				null,
				node_dict_create(path, pathIdx, wildcard_group_end(path, pathIdx), store)
			];
		case `\\`: throw new Error(`escaping characters is not supported, use their url-encoded equivalent instead!`);
	}
	return [
		path.slice(startIdx),
		store,
		null,
		null
	];
};
const node_insert = (node, path, pathIdx, store) => {
	let nodePath = node[0], nodePathIdx = 0;
	while (pathIdx < path.length) {
		let pathChar = path[pathIdx];
		if (nodePathIdx === nodePath.length) {
			if (is_prefixed_regexp_group(path, pathIdx)) pathChar = path[pathIdx + 1];
			switch (pathChar) {
				case `{`:
					insert_to_dynamic_node_map(node, path, pathIdx + 1, group_delimiter_end(path, pathIdx + 1), store);
					return;
				case `(`:
					insert_to_dynamic_node_map(node, path, pathIdx, unnamed_group_end(path, pathIdx), store);
					return;
				case `:`:
					insert_to_dynamic_node_map(node, path, pathIdx, named_group_end(path, pathIdx), store);
					return;
				case `*`:
					insert_to_dynamic_node_map(node, path, pathIdx, wildcard_group_end(path, pathIdx), store);
					return;
			}
			if (node[2] === null) {
				node[2] = dict(pathChar, node_create(path, pathIdx, store));
				return;
			} else {
				const map = node[2];
				if ((node = map[pathChar]) == null) {
					map[pathChar] = node_create(path, pathIdx, store);
					return;
				} else {
					pathIdx++;
					nodePath = node[0];
					nodePathIdx = 1;
				}
			}
		} else {
			const nodePathChar = nodePath[nodePathIdx];
			if (pathChar !== nodePathChar || is_prefixed_regexp_group(path, pathIdx)) {
				const movedNode = [
					nodePath.slice(nodePathIdx),
					node[1],
					node[2],
					node[3]
				];
				nodePath = node[0] = nodePath.slice(0, nodePathIdx);
				node[2] = dict(nodePathChar, movedNode);
				node[1] = node[3] = null;
			} else {
				pathIdx++;
				nodePathIdx++;
			}
		}
	}
	if (nodePathIdx < nodePath.length) {
		const movedNode = [
			nodePath.slice(nodePathIdx),
			node[1],
			node[2],
			node[3]
		];
		node[0] = nodePath.slice(0, nodePathIdx);
		node[2] = dict(nodePath[nodePathIdx], movedNode);
		node[3] = null;
	}
	node[1] = store;
};
(async () => {}).constructor;
group([error((e) => {
	console.error(e);
	return new Response("error", { status: 500 });
})], get("/:id", (params) => new Response(params.id)), get("*", (req) => new Response(req.url), "wintertc:request"));
var mapl_default = { fetch: (function anonymous(g) {
	return function(r) {
		let o = (h, r) => h ? (r.body.cancel(), new Response(null, r)) : r, m0 = g[0][0][1], h0 = g[1][2], h1 = g[2][2];
		return (this.fetch = (r) => {
			let h = false;
			new Headers();
			let u = r.url, s = u.indexOf("/", 8), e = u.indexOf("?", s + 1), p = e === -1 ? u.slice(s) : u.slice(e);
			switch (r.method) {
				case "HEAD": h = true;
				case "GET": {
					let m = /^(?:\/(?<id>[^/]+)()|.*())$/.exec(p);
					if (m !== null) {
						if (m[2] === "") try {
							return o(h, h0(m.groups));
						} catch (e) {
							return m0(e);
						}
						else if (m[3] === "") try {
							return o(h, h1(r));
						} catch (e) {
							return m0(e);
						}
					}
				}
			}
			return new Response(null, { status: 404 });
		})(r);
	};
}) };
export { mapl_default as default };
