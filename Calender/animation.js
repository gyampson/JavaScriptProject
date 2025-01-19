// rotate and move elements with a class of "box"
// ("x" is a shortcut for a translateX() transform) over the course of 1 second.
gsap.from(".menu-bar", { duration: 3, x: 500, ease: "power1.inOut" });
gsap.from(".sub-menu1", { duration: 10, x: -300, ease: "power2.inOut" });
gsap.from("section", { duration: 5, y: 800, ease: "power1.inOut" });
gsap.from("button", { duration: 7, x: -500, ease: "power2.inOut" });
