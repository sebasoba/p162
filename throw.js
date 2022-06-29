const { PRIORITY_BELOW_NORMAL } = require("constants");

AFRAME.registerComponent("throw",{
    keyDown: function(){
    var camera = document.querySelector("#camera").object3D;
    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    ball.setAttribute("velocity",direction.multiplyScalar(-10)) 

    ball.addEventListener("collide", this.removeBall);
    },

    removeBall: function (e) {
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        if(elementHit.id.includes("pin")) {
            var impulse = new CANNON.Vec3(0,1,-15);
            var worldPoint = new CANNON.Vec3().copy(
                elementHit.getAttribute("position")
            );

            elementHit.body.applyForce(impulse, worldPoint);

            element.removeEventListener("collide", this.removeBall);

            var scene = document.querySelector("#scene");
            scene.removeChild(element);
        }
    }
}) 