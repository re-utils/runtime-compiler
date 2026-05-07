let IS_BUILD = !1;
let IS_AOT = !1;
const setAOT = () => {
	IS_BUILD = !1;
	IS_AOT = !0;
};
//#endregion
//#region ../../node_modules/runtime-compiler/env/aot.js
setAOT();
//#endregion
//#region ../../node_modules/runtime-compiler/artifact.js
const __rtcpl_atf__ = [];
const reserveArtifact = () => __rtcpl_atf__.push(void 0) - 1;
const evaluate$1 = (content) => (globalThis.__rtcpl_atf__ = __rtcpl_atf__, (0, eval)(content));
//#endregion
//#region ../../node_modules/runtime-compiler/utils.js
const emptyFn = () => {};
//#endregion
//#region ../../node_modules/runtime-compiler/globals.js
let content = "";
let evaluate = IS_AOT ? () => {
	aotFn(__rtcpl_atf__), evaluate = emptyFn;
} : () => {
	content.length > 0 && (evaluate$1(content), content = "");
};
let __rtcpl_ct__ = "";
const emit = IS_AOT ? emptyFn : IS_BUILD ? (code) => {
	content += code;
	__rtcpl_ct__ += code;
} : (code) => {
	content += code;
};
let aotFn;
const __rtcpl_setup_aot__ = (fn) => {
	aotFn = fn;
};
//#endregion
//#region ../../node_modules/runtime-compiler/index.js
const artifact = (id) => (evaluate(), __rtcpl_atf__[id]);
//#endregion
//#region src/index.entry.ts
__rtcpl_setup_aot__((__rtcpl_atf__) => {
	__rtcpl_atf__[0] = () => console.log("Hi");
});
const fn = reserveArtifact();
IS_AOT || emit(`__rtcpl_atf__[${fn}]=()=>console.log("Hi");`);
IS_BUILD && console.log("Building...");
artifact(fn)();
//#endregion
