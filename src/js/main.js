'use strict';
// 標準的なpolyfillをインストール
import 'core-js/stable';
// 必要なpolyfillをインストール
import 'intersection-observer';

// adobe fonts
(function(d) {
  var config = {
    kitId: 'esz8cro',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

// 変数定義
const break_point = 699;
let width = window.innerWidth;

// ロード完了後処理
window.onload = function() {
  // スライダー2枚目以降遅延表示
  const slider_imgs = document.querySelectorAll('.slider-img');
  slider_imgs.forEach(function(slider_img) {
    slider_img.style.visibility = 'visible';
  })
  // テキストアニメーション
  const slider_texts = document.querySelectorAll('.slider-text');
  slider_texts.forEach(function(slider_text) {
    slider_text.classList.add('loaded');
  })
};

// ハンバーガーメニュー
const hamburger_btn = document.querySelector('.hamburger-btn');
const hn_container = document.querySelector('.hn-container');
const slide_text_container = document.querySelector('.slider-text-container');
hamburger_btn.addEventListener('click', function() {
  slide_text_container.classList.toggle('hide');
  slide_text_container.classList.toggle('show');
  hamburger_btn.classList.toggle('close');
  hn_container.classList.toggle('close');
  hamburger_btn.classList.toggle('open');
  hn_container.classList.toggle('open');
});

// スクロールインディケーター
// 要素の取得
const indicator = document.querySelector('.indicator');
const callback = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      if(entry.target.classList.contains('bottom') || entry.target.classList.contains('left')) {
        if(width <= break_point) {
          indicator.classList.remove('up');
          indicator.classList.add('down');
        } else {
          indicator.classList.remove('right');
          indicator.classList.add('left');
        }
      } else if(entry.target.classList.contains('top') || entry.target.classList.contains('right')) {
        if(width <= break_point) {
          indicator.classList.remove('down');
          indicator.classList.add('up');
        } else {
          indicator.classList.remove('left');
          indicator.classList.add('right');
        }
      }
    }
  });
};
const option = {
  rootMargin: '0px'
};
const io = new IntersectionObserver(callback, option);
const targets = document.querySelectorAll('.point');
targets.forEach(function(target) {
  io.observe(target);
})

// リサイズ
window.addEventListener('resize', function() {
  width = window.innerWidth;
  // ハンバーガーメニュー
  if(width > break_point) {
    slide_text_container.classList.remove('hide');
    slide_text_container.classList.add('show');
    hamburger_btn.classList.remove('open');
    hn_container.classList.remove('open');
    hamburger_btn.classList.add('close');
    hn_container.classList.add('close');
  }
});

// マップ
const close_btns = document.querySelectorAll('.map-close');
const map_radios = document.querySelectorAll('.map-radio');
close_btns.forEach(function(close_btn) {
  close_btn.addEventListener('click', function() {
    map_radios.forEach(function(map_radio) {
      map_radio.checked = false;
    })
  });
})