(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currnetScene = 0;

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      //1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= pageYOffset) {
        currnetScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currnetScene}`);
  }
  function calcValues(values, currentYOffset) {
    let rv;
    let scrollRatio = currentYOffset / sceneInfo[currnetScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0] + values[0]);
    return rv;
  }
  function playAnimation() {
    const objs = sceneInfo[currnetScene].objs;
    const values = sceneInfo[currnetScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    switch (currnetScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currnetScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset >= prevScrollHeight + sceneInfo[currnetScene].scrollHeight) {
      currnetScene++;
      document.body.setAttribute("id", `show-scene-${currnetScene}`);
    } else if (yOffset < prevScrollHeight) {
      if (currnetScene === 0) return;
      currnetScene--;
      document.body.setAttribute("id", `show-scene-${currnetScene}`);
    }
    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
})();
