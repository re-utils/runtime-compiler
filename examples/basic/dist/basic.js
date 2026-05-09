const __rtcpl_atf__ = [], __rtcpl_aot_fns__ = [], __rtcpl_setup_aot__ = (f) => {
	__rtcpl_aot_fns__.push(f);
};
let __rtcpl_aot_fn_idx__ = 0;
const createRef = () => __rtcpl_atf__.push(void 0) - 1, deref = (i) => __rtcpl_atf__[i], evaluate = () => __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_atf__);
__rtcpl_setup_aot__(($) => {
	$[0] = () => console.log("Hi");
});
//#region src/basic.ts
const fn = createRef();
evaluate(), deref(fn)();
//#endregion
