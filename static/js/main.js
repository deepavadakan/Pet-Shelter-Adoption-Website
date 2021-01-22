var firstGranim = new Granim({
    element: "#canvas-topbar",
    name: "canvas-topbar-gradient",
    elToSetClassOn: ".wrapper",
    direction: "top-bottom",
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    image : {
          source: 'static/images/logo1.png',
          stretchMode: ["none", "none"],
          blendingMode: 'overlay'
    },
    states: {
      "default-state": {
        gradients: [["#9C27B0", "#E91E63"], ["#009688", "#8BC34A"]],
        transitionSpeed: 2000
      },
      "green-state": {
        gradients: [["#4CAF50", "#CDDC39"], ["#FFEB3B", "#8BC34A"]],
        transitionSpeed: 2000
      },
      "red-state": {
        gradients: [["#E91E63", "#FF5722"], ["#F44336", "#FF9800"]],
        transitionSpeed: 2000
      }
    }
  });

  