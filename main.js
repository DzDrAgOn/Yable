var head = document.getElementById("yable-head")
head.scroll(20, 0)


var s1 = document.getElementById('yable-head');
var s2 = document.getElementById('yable-body');

function select_scroll_1(e) { s2.scrollLeft  = s1.scrollLeft ; }
function select_scroll_2(e) { s1.scrollLeft  = s2.scrollLeft ; }

s1.addEventListener('scroll', select_scroll_1, false);
s2.addEventListener('scroll', select_scroll_2, false);