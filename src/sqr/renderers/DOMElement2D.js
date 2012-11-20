SQR.DOMElement2D = function(element) {

    this.element = element;

    var matrix2D = new SQR.Matrix2D();
    var mvp = new SQR.Matrix44();

    this.draw = function(transform, uniforms) {
        uniforms.projection.copyTo(mvp);
        mvp.multiply(transform.globalMatrix);

        var p = new SQR.V3(0,0,0);

        mvp.transformVector(p);

        p.x = p.x / p.z * uniforms.centerX;
        p.y = p.y / p.z * uniforms.centerY;

        var s = 1 / (p.z / uniforms.cssDistance);
        var r = transform.rotation.z;

        matrix2D.setTRS(p.x, p.y, r, s, s);

        var t3d = (uniforms.supportsCSS3D) ? SQR.DOMUtil.translate3dCss(0, 0, 0) : "";
        var m = t3d + matrix2D.getAsCSSProperty(false);

        element.style.zIndex = uniforms.depth;
        element.style['transform'] = m;
        element.style['-webkit-transform'] = m;
        element.style['-moz-transform'] = m;
        element.style['-o-transform'] = m;
        element.style['-ms-transform'] = m;
        element.style['display'] = (p.z <= 0) ? 'none' : 'block';
    }
}