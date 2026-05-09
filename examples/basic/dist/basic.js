let __rtcpl_aot_fn_idx__ = 0;
const __rtcpl_r__ = [], __rtcpl_aot_fns__ = [($) => {
	$[0] = () => console.log("Hi");
}], createRef = () => __rtcpl_r__.push(void 0) - 1, deref = (i) => __rtcpl_r__[i], evaluate = () => __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_r__), fn = createRef();
evaluate(), deref(fn)();
//#endregion
