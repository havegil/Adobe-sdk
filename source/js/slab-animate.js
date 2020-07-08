
    let animCount = 0;
    let animStyle = ["fadeIn", "slideRight", "fadeIn", "slideRight","fadeIn", "slideRight", "fadeItIn", "slideUp"];
    let mcAnim = ['laptop', 'lp-pointer', 'ipad', 'ipad-pointer', 'phone', 'phone-pointer', 'flashes', 'slab-text'];

    var animateMobile = false;


    var element = document.getElementById("stage");
    element.addEventListener("animationstart", listener, false);
    element.addEventListener("animationend", listener, false);
    element.addEventListener("transitionend", listener, false);
    element.addEventListener("animationiteration", listener, false);

    // var element2 = document.getElementById("slab-text");
    // element2.addEventListener("animationstart", listener, false);
    // element2.addEventListener("animationend", listener, false);
    // element2.addEventListener("animationiteration", listener, false);
  

    function listener(event) {
      //console.log(event.type);
      switch(event.type) {
        case "animationstart":      
          break;
        case "animationend":
          animCount++;
          if( animCount < mcAnim.length){
            console.log("completed animation " + mcAnim[animCount-1]);
              //goto and Play next item
              gotoAndPlay(mcAnim[animCount], animStyle[animCount]);
          }
          break;
        case "transitionend":
          console.log("completed transition " + mcAnim[animCount-1]);
        break;
        case "animationiteration":
          
          break;
      }    
    }

    function deviceAnimation(){
      if(animateMobile){//skip playing the laptp
        console.log("Now playing mobile animation " );
        animCount = 2;
        gotoAndPlay("ipad", "fadeIn");
      }else{
        gotoAndPlay("laptop", "fadeIn");
      }    
  }

    function gotoAndPlay(clip, animotion){
        console.log("requesting  "+ animotion +" for playback on " + clip)
        let startAnim = document.getElementById(clip);
        startAnim.classList.add(animotion);
    }

    //Feature check
    function checkBrowserWindow(){
      let el = document.getElementById('code-screen');
      let elStyle = window.getComputedStyle(el, null).display;
        console.log( "Element style display value: " + elStyle)

        if(elStyle == "none"){          
          animateMobile = true;
        }else{
          animateMobile = false;
        }

        deviceAnimation();
    }

    //track end of window resizing
    function debounce(func){
      var timer;
      return function(event){
        if(timer){
          clearTimeout(timer);
          deviceAnimation();
        }
        timer = setTimeout(func,100,event);
      };
    }
    window.onresize = debounce;

    checkBrowserWindow();

  
  

  