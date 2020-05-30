window.onload = function() {
	initMap();
	window.addEventListener("scroll", showMenu)
	document.getElementById("webMenu").addEventListener('click', openMenu);
	document.getElementById("closeMenu").addEventListener('click', closeMenu);

	var btn = document.getElementsByClassName('menu-nav');

	for (var i=0; i < btn.length; i++) {
		btn[i].addEventListener('click', toMe);
	};
};

function showMenu(){
	if( document.getElementById('about').getBoundingClientRect().top <= 0){
		if(document.getElementById("fltMenu") === null){
			var btn = document.createElement("BUTTON");
			btn.innerHTML = "&#x2630;";
			btn.setAttribute("id", "fltMenu");

			document.body.insertBefore(btn, document.body.firstChild);
			document.getElementById("fltMenu").addEventListener('click', openMenu);			
		}
	}else if(document.getElementById("fltMenu") !== null){
		var ele = document.getElementById("fltMenu");
		ele.parentNode.removeChild(ele);
	}
}

function openMenu(){
	document.getElementById('menuBtnGroup').classList.remove("hide");
	var pos = -100;
	var id = setInterval(pullDown, 1);

	function pullDown() {
		if (pos < 0) {
			pos += 2;
			document.getElementById('webMenuBlock').style.top = pos + '%';
		} else {
			clearInterval(id);
		}
	}
	
}

function closeMenu(){
	var pos = 0;
	var id = setInterval(pullUp, 1);

	function pullUp() {
		if (pos > -100) {
			pos -= 2;
			document.getElementById('webMenuBlock').style.top = pos + '%';
		} else {
			clearInterval(id);
		}
	}
}

function toMe(){
	if(document.getElementById('webMenuBlock').style.top === '0%'){
		document.getElementById('menuBtnGroup').classList.add("hide");
		document.getElementById('webMenuBlock').style.top = '-100%';
	}

	var pos = window.scrollY;
	var despos = document.getElementById(this.getAttribute('data-id')).getBoundingClientRect().top + pos;
	var id = pos <= despos ? setInterval(scrollDown, 1) : setInterval(scrollUp, 1);

	function scrollDown() {
		if (pos >= despos) {
			clearInterval(id);
		} else {
			pos += 30;
			window.scrollTo(0, pos);
		}
	}

	function scrollUp(){
		if (pos <= despos) {
			clearInterval(id);
		} else {
			pos -= 30;
			window.scrollTo(0, pos);
		}
	}
}

function contactMe(){
	location.href = 'mailto:' + '&#99;&#104;&#97;&#110;&#103;' + '&#99;&#104;&#101;&#97;&#107;' + '&#108;&#105;&#109;' + '&#64;' + '&#103;&#109;&#97;&#105;&#108;' + '&#46;' + '&#99;&#111;&#109;';
}