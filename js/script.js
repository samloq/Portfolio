
function myFunction() {
    var x = document.getElementById("mySideNav");
    if (x.className === "sidenav") {
        x.className += " responsive";
    } else {
        x.className = "sidenav";
    }
}

$( document ).ready(function() {

    const UI = (function() {
        let init = function() {
            pageOneConfig();
            // ghostery();
        }
        let currentIndex = 1;
        let previousIndex = 1;
        //========CONSTANTS========
        const pageOne = 1;
        const pageTwo = 2;
        const pageThree = 3;
        const pageFour = 4;
        const pageFive = 5;
        const pageSix = 6;
        
        //========CONTENTS========
        
        //Page One Contents
        let homeSubtextDate = '31/05/2019'

        //========SELECTORS========
        
        //Preloader Selectors
        let preloadWrappSel = document.getElementById('loader-wrapper');
        let preloadSel = document.getElementById('load');

        
        //Navbar Selectors
        let navSel = document.getElementById('sidenav');
        let homeNavSel = document.getElementById('home-nav-item');
        let aboutNavSel = document.getElementById('about-nav-item');
        let projectsNavSel = document.getElementById('projects-nav-item');
        let toolsNavSel = document.getElementById('tools-nav-item');
        let contactNavSel = document.getElementById('contact-nav-item');
        let creditsNavSel = document.getElementById('credits-nav-item');
        
        //Page Selectors
        let pageOneSel = document.getElementById('page1');
        let pageTwoSel = document.getElementById('page2');
        let pageThreeSel = document.getElementById('page3');
        let pageFourSel = document.getElementById('page4');
        let pageFiveSel = document.getElementById('page5');
        let pageSixSel = document.getElementById('page6');

        //Page One Selectors
        let homeSel = document.getElementById('home');
        let homeTextWrapperSel = document.getElementById('home-text-wrapper');
        let homeTextSel = document.getElementById('home-text');
        let homeSubTextSel = document.getElementById('home-subtext');
        let homeTextLetterSel = document.getElementsByClassName('blast');
        let homeImageFrontSel = document.getElementById('home-image-front');
        let homeImageBackSel = document.getElementById('home-image-back');

        
        //Projects links
        let mernLink = `https://github.com/strejcik/-MERN-e-commerce`;
        let photoTimeLink = `https://github.com/strejcik/-HTML-CSS-SCSS-PHOTOTIME`;
        let realEstateLink = `https://github.com/strejcik/-NODE-RealEstate`;

        //Projects links selectors
        let mernLinkBtnSel = document.getElementById('mern-link');
        let photoTimeLinkBtnSel = document.getElementById('phototime-link');
        let realEstateLinkBtnSel = document.getElementById('realestate-link');

        
        /*============================= START OF GENERAL FUNCTIONS =============================*/
        let addEvent = function(object, type, callback) {
            if (object == null || typeof(object) == 'undefined') return;
            if (object.addEventListener) {
                object.addEventListener(type, callback, false);
            } else if (object.attachEvent) {
                object.attachEvent("on" + type, callback);
            } else {
                object["on"+type] = callback;
            }
        };

        let adBlockDetect = function() {
            if( window.canRunAds === undefined ){
                // console.log('adblock/ghostery detected');
                document.getElementById("linkedin-badge").remove();
            } else {
                $('.linkedin-wrapper').addClass('hide');
            }
        }();

        addEvent(window, "resize", function(event) {
            // console.log(window.innerWidth);
        });


        let displayTweenText = function(selector, options) {
            TweenLite.to(selector, 1,options);
        }

        //Promise timeout
        let delay = function(t) {
            return new Promise(resolve => setTimeout(resolve, t));
        }

        //Delimits text so every word / letter is separated
        let delimitText = function(selector, delimiter ='letter') {
            $(selector)
            .blast({ delimiter: delimiter })
            .velocity("fadeIn", { 
              duration: 2250,
              stagger: 40,
              delay: 600
            });
        }

        //Changes current index and previous index during transition from one page to another 
        let indexManager = function(pageNmb, currentIndex) {
            if(currentIndex < pageNmb) {
                currentIndex = pageNmb;
                previousIndex = currentIndex-1;
            }
        }

        //Invoke effects/functions after changing the page
        let leavingEffect = function(index) {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            if(index ===1) {
                $(pageOneSel).removeClass('animated fadeOut'); 
                pageOneUnmount();
                
                $(pageTwoSel).addClass('animated fadeOut');
                $(aboutNavSel).removeClass('active-nav-item');
            }
            if( index === 2){
                pageTwoEffects();
                $(pageTwoSel).removeClass('animated fadeOut display');
                $(homeNavSel).removeClass("active-nav-item animated fadeIn"); 

            }
            if(index === 3) {
                $(pageThreeSel).removeClass('animated fadeOut display');
            }
            if(index === 4) {
                $(pageFourSel).removeClass('animated fadeOut display');
            }
            if(index === 5) {
                $(pageFiveSel).removeClass('animated fadeOut display');
            }
            if(index === 6) {
                $(pageSixSel).removeClass('animated fadeOut display');
            }
        }
        //(Home) letter changer
        let letterChanger = function(target, syntax){
            s = '';
            for( var i = 32; i <= 126; i++ )
            {
              s += String.fromCharCode( i );
            }
            letterChanger(target, s, 0, 20, syntax);
            function letterChanger (target, message, index, interval) {
              if (index < message.length) {
                var next = message[index++];
                target.innerHTML = next;
                setTimeout(function () { letterChanger(target, message, index, interval); }, interval);
              } else {
                target.innerHTML = '';
                setTimeout(function(){      target.innerHTML+=` ${syntax}`;}, interval*3)
              }
            }
          
          }
        //(Navigation) Change page after click
        let navManager = function() {
            $(homeNavSel).click(function() {
                $(".main").moveTo(1);
            });
            $(aboutNavSel).click(function() {
                $(".main").moveTo(2);
            });
            $(projectsNavSel).click(function() {
                $('.main').moveTo(3);
            });
            $(toolsNavSel).click(function() {
                $('.main').moveTo(4);
            });
            $(contactNavSel).click(function() {
                $('.main').moveTo(5);
            });
            $(creditsNavSel).click(function() {
                $('.main').moveTo(6);
            });
        }();

        //Project buttons that are responsible for openning details in new window
        let openProjectLink = function() {  
            $(mernLinkBtnSel).click(function() {
                window.open(mernLink);
                return false;
            });
            $(photoTimeLinkBtnSel).click(function() {
                window.open(photoTimeLink);
                return false;
            });
            $(realEstateLinkBtnSel).click(function() {
                window.open(realEstateLink);
                return false;
            });
        }();
        /*============================= END OF GENERAL FUNCTIONS =============================*/

        /*============================= START OF PAGE ONE SECTION=============================*/
        
        let pageOneUnmount = function() {
            $(homeSel).unbind('mouseenter mouseleave');
            $(homeTextLetterSel).unbind('mouseenter mouseleave');
            $(homeImageBackSel).unbind('mouseenter mouseleave');
            $(homeImageFrontSel).unbind('mouseenter mouselave');
        }

        let pageOneEffects = function() {
            pageOneTextEffects();
            pageOneHoverEffects();
            pageOneNavbarEffects();
        }

        let pageOneNavbarEffects = function() {
            homeNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }

        let pageOneTextEffects = function() {
            let options = {
                text: `Hi,${'<br/>'}My name is ${`<img src="https://fontmeme.com/permalink/190515/e9738a23c6655d97267761391b6079c2.png">`}artek. ${'<br/>'} I'm Junior Web Developer`,
                ease:Linear.easeNone,
                onComplete: function() {
                    delimitText(homeTextWrapperSel);
                }
            }
            displayTweenText(homeTextSel, options);

            
            delay(2000).then(function(){ letterChanger(homeSubTextSel, homeSubtextDate); delimitText(homeSubTextSel); })

        }

        let pageOneHoverEffects = function() {
            delay(2000).then(function(){
                $(homeTextLetterSel).hover(
                    function(){ $(this).addClass('animated rubberBand')},
                    function(){ let self = this; delay(700).then(function(){ $(self).removeClass('animated rubberBand')  })}
                )
            })
        }

        let pageOneConfig = function() {
            indexManager(pageOne, currentIndex);
            pageOneEffects();
        }
        /*============================= END OF PAGE ONE SECTION=============================*/


        /*============================= START OF PAGE TWO SECTION=============================*/
        let runPreloadEffect = function() {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            $('html').addClass('js');
            delay(2000).then(function(){
                $(preloadWrappSel).addClass('fadeOut');
                $('html').removeClass('js');
                $(pageTwoSel).addClass('display');
            })

        }

        let pageTwoNavEffect = function() {
            aboutNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }

        let pageTwoDrawUserEffect = function() {
            let el = document.querySelector('#user');
            let myAnimation = new LazyLinePainter(el, {"ease":"easeLinear","strokeWidth":0.2,"strokeOpacity":1,"strokeColor":"#222F3D","strokeCap":"square", delay: 2000}); 
            myAnimation.paint(); 
        }

        let pageTwoEffects = function() {
            runPreloadEffect();
            pageTwoNavEffect();
            pageTwoDrawUserEffect();
        }

        let pageTwoConfig = function() {
            indexManager(pageTwo, currentIndex);
            pageTwoEffects();
        }
        /*============================= END OF PAGE TWO SECTION=============================*/

        /*============================= START OF PAGE THREE SECTION=============================*/
        
        let pageThreePreloadEffect = function() {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            
            $('html').addClass('js');
            delay(2000).then(function(){
                $(preloadWrappSel).addClass('fadeOut');
                $('html').removeClass('js');
                $(pageThreeSel).addClass('display');
            })
        }

        let pageThreeNavbarEffects = function() {
            projectsNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }
        
        let pageThreeEffects = function() {
            pageThreePreloadEffect();
            pageThreeNavbarEffects();
        }

        let pageThreeCarousel = function() {
            delay(1000).then(function(){
                $(".owl-carousel").owlCarousel({
                    margin:10,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        600:{
                            items:3,
                            nav:false
                        },
                        1000:{
                            items:5,
                            loop:false
                        }
                    }
                });
            })
        }

        let pageThreeConfig = function() {
            indexManager(pageThree, currentIndex);
            pageThreeCarousel();
            pageThreeEffects();
        }
        /*============================= END OF PAGE THREE SECTION=============================*/
        
        /*============================= START OF PAGE FOUR SECTION=============================*/
        let pageFourCarousel = function() {
            console.log('pagefour executed');
            delay(1000).then(function(){
                let owl = $(".owl-carousel");
                owl.owlCarousel({
                    margin:10,
                    autoplay:true,
                    loop: true,
                    autoplayTimeout:1000,
                    autoplayHoverPause:true,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                        },
                        600:{
                            items:3,
                            nav:false,
                        },
                        1000:{
                            items:5,
                        }
                    }
                });
            })
        }

        let pageFourPreloadEffect = function() {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            $('html').addClass('js');
            delay(2000).then(function(){
                $(preloadWrappSel).addClass('fadeOut');
                $('html').removeClass('js');
                $(pageFourSel).addClass('display');
            });
        }

        let pageFourEffects = function() {
            pageFourPreloadEffect();
            pageFourNavbarEffects();
        }

        let pageFourNavbarEffects = function() {
            toolsNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }

        
        let pageFourConfig = function() {
            indexManager(pageFour, currentIndex);
            pageFourCarousel();
            pageFourEffects();
        }
        
        
        /*============================= END OF PAGE FOUR SECTION=============================*/

        /*============================= START OF PAGE FIVE SECTION=============================*/
        let pageFivePreloadEffect = function() {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            $('html').addClass('js');
            delay(2000).then(function(){
                $(preloadWrappSel).addClass('fadeOut');
                $('html').removeClass('js');
                $(pageFiveSel).addClass('display');
            });
        }


        let pageFiveNavbarEffects = function() {
            contactNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }

        let pageFiveEffects = function() {
            pageFivePreloadEffect();
            pageFiveNavbarEffects();
        }

        let pageFiveConfig = function() {
            indexManager(pageFive, currentIndex);
            pageFiveEffects();
        }


        /*============================= END OF PAGE FIVE SECTION=============================*/

        /*============================= START OF PAGE SIX SECTION=============================*/
        let pageSixPreloadEffect = function() {
            let navItems = [homeNavSel, aboutNavSel, projectsNavSel, toolsNavSel, contactNavSel, creditsNavSel];
            navItems.forEach(function(e){ $(e).removeClass('active-nav-item')});
            $('html').addClass('js');
            delay(2000).then(function(){
                $(preloadWrappSel).addClass('fadeOut');
                $('html').removeClass('js');
                $(pageSixSel).addClass('display');
            });
        }

        let pageSixNavbarEffects = function() {
            creditsNavSel.className += ` ${'active-nav-item animated fadeIn'}`;
        }

        let pageSixEffects = function() {
            pageSixPreloadEffect();
            pageSixNavbarEffects();
        }

        let pageSixConfig = function() {
            indexManager(pageSix, currentIndex);
            pageSixEffects();
        }


        /*============================= END OF PAGE SIX SECTION=============================*/
        let pageManager = function(index) {
            switch(index) {
                case pageOne:{
                    pageOneConfig();
                    break;
                }
                case pageTwo: {
                    pageTwoConfig();
                    break;
                }
                case pageThree: {
                    pageThreeConfig();
                    break;
                }
                case pageFour: {
                    pageFourConfig();
                    break;
                }
                case pageFive: {
                    pageFiveConfig();
                    break;
                }
                case pageSix: {
                    pageSixConfig();
                    break;
                }
                default:
                    pageOneConfig();
                    break;
            }
        }
        return {
          callPageManager: function(index) {
              pageManager(index);
          },
          callInit: function() {
              init();
          },
          callLeavingEffect: function(index) {
              leavingEffect(index);
          }
        };
        
      })();
      UI.callInit();

    $(".main").onepage_scroll({
        sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                         // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
        pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function(index) {
            UI.callLeavingEffect(index);
        },  // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function(index) {
            UI.callPageManager(index);

        },   // This option accepts a callback function. The function will be called after the page moves.
        loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true,                  // You can activate the keyboard controls
        responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                         // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                         // the browser's width is less than 600, the fallback will kick in.
        direction: "horizontal"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
     });



});
