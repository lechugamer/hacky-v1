const particlesConfig =('bg', {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800,
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#ffffff"
        },
        polygon: {
          nb_sides: 12
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: true,
          speed: 1.4385614385614387,
          opacity_min: 0.11188811188811189,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 3,
          size_min: 5,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: " ",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 59.94005994005994,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 150,
          size: 10,
          duration: 10,
          opacity: 1,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
    }
  );
  
  export default particlesConfig