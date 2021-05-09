
import { gsap, MotionPathPlugin } from "gsap/all";
import "./style.css";
// Пишем код Javascript!
gsap.registerPlugin(MotionPathPlugin);

var redArm = document.querySelector("#redArm"),
  blueArm = document.querySelector("#blueArm"),
  joint = document.querySelector("#joint"),
  kolben = document.querySelector("#kolben"),
  duration = 5,
  radius = 17.5,
  // локальные координаты в redArm являются соединением.
  // Его радиус 17,5 пикселей, поэтому правый конец находится в точке {x: 17,5, y: 0}.
  armTip = { x: radius, y: 0 };
var tl = gsap
  .timeline({ onUpdate: onUpdate, repeat: -1 })
  .to(
    redArm,
    {
      duration: duration,
      rotation: 360,
      ease: "none"
    },
    0
  )
  .to(
    kolben,
    {
      duration: duration / 2,
      x: -radius * 2,
      ease: "sine.inOut",
      repeat: 1,
      yoyo: true
    },
    0
  );

function onUpdate() {
  // преобразовать из локальных координат redArm {x: 17.5, y: 0} в то место, где эта же точка будет в локальных координатах колбена.
  var p = MotionPathPlugin.convertCoordinates(redArm, kolben, armTip);
  blueArm.setAttribute("x1", p.x);
  blueArm.setAttribute("y1", p.y);
  joint.setAttribute("cx", p.x);
  joint.setAttribute("cy", p.y);
}
