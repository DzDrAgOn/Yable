function yable(selector, options) {
    console.log(selector)
    const self = {
        element: document.getElementById(selector),
        html: () => self.element,
        on: (event, callback) => {
            document.addEventListener(event, callback);
            var s1 = document.getElementById('yable-head');
            var s2 = document.getElementById('yable-body');

            function select_scroll_1(e) { s2.scrollLeft = s1.scrollLeft; }
            function select_scroll_2(e) { s1.scrollLeft = s2.scrollLeft; }

            s1.addEventListener('scroll', select_scroll_1, false);
            s2.addEventListener('scroll', select_scroll_2, false);

        },
        init: () => {

            let yable_core = document.createElement('div');
            yable_core.classList.add('yable');

            let yable_grid = document.createElement('div');
            yable_grid.classList.add('yable-grid');

            let yable_left_side = document.createElement('div');
            yable_left_side.classList.add('yable-left-side');

            let yable_head = document.createElement('div');
            yable_head.classList.add('yable-head');
            yable_head.setAttribute("id", "yable-head");


            let yable_head_group = document.createElement('div');
            yable_head_group.classList.add('yable-head-group');

            let x = 0;
            let w = 0;
            const mouseDownHandler = function (e) {
                if (e.target.classList.contains('yable-th-resize')) {
                    x = e.clientX;
                    var col = e.target.closest('.yable-th');
                    const styles = window.getComputedStyle(col);
                    w = parseInt(styles.width, 10);

                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                }
                //resizer.classList.add('resizing');
            };

            const mouseMoveHandler = function (e) {
                console.log(e.target.classList.contains('yable-th-resize'))
                if (e.target.classList.contains('yable-th-resize')) {
                    const dx = e.clientX - x;
                    var col = e.target.closest('.yable-th');
                    col.style.width = `${w + dx}px`;
                }
            };

            const mouseUpHandler = function () {
                //resizer.classList.remove('resizing');
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            const showmenu = function (e) {
                console.log(e.target)


                var slides = document.getElementsByClassName("yable-menu");
                for (var i = 0; i < slides.length; i++) {
                    //console.log(slides.item(i));
                    slides.item(i).parentNode.removeChild(slides.item(i));
                }

                var menu = document.createElement('div');
                var box = e.target.getBoundingClientRect();
                var body = document.body;
                var docEl = document.documentElement;
                var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
                var clientTop = docEl.clientTop || body.clientTop || 0;
                var clientLeft = docEl.clientLeft || body.clientLeft || 0;
                var top = box.top + scrollTop - clientTop;
                var left = box.left + scrollLeft - clientLeft;
                console.log(top, left)
                if (left < 250) {
                    menu.classList.add("arrow_box_left");
                    menu.style.left = (left) + "px"
                } else {
                    menu.style.left = (left - 250) + 16 + "px"
                    menu.classList.add("arrow_box_right");
                }
                menu.style.top = top + 22 + "px"

                menu.classList.add('yable-menu');
                menu.classList.add('arrow_box');
                var text = document.createTextNode("element[item.field]");
                menu.appendChild(text);
                document.body.appendChild(menu)
            };

            options.columnDefs.forEach((element, i) => {
                var yable_th = document.createElement('div');
                yable_th.classList.add('yable-th');
                var text = document.createTextNode(element.field);
                yable_th.appendChild(text);


                var resize = document.createElement('span');
                resize.classList.add('yable-th-resize');
                resize.setAttribute("id", i);

                resize.addEventListener('mousedown', mouseDownHandler);

                var drop = document.createElement('span');
                drop.classList.add('yable-th-drop-menu');
                drop.setAttribute("id", i);
                drop.addEventListener('click', showmenu);

                yable_th.appendChild(drop)
                yable_th.appendChild(resize)
                yable_head_group.appendChild(yable_th)
            });

            yable_head.appendChild(yable_head_group)
            yable_left_side.appendChild(yable_head)
            yable_grid.appendChild(yable_left_side)

            //////////////////////////////
            let yable_body = document.createElement('div');
            yable_body.classList.add('yable-body');
            yable_body.setAttribute("id", "yable-body");
            yable_left_side.appendChild(yable_body)

            options.rowData.forEach((element, index) => {

                var yable_tr = document.createElement('div');
                yable_tr.classList.add('yable-tr');

                options.columnDefs.forEach((item, k) => {
                    //console.log(item,element[item.field])
                    var yable_td = document.createElement('div');
                    yable_td.classList.add('yable-td');
                    var text = document.createTextNode(element[item.field]);
                    yable_td.appendChild(text);
                    yable_tr.appendChild(yable_td)
                })

                yable_body.appendChild(yable_tr)
            });
            /////////////////////////////

            ////////////////// yable_right_side  /////////////////////
            let yable_right_side = document.createElement('div');
            yable_right_side.classList.add('yable-right-side');

            let menu_component = document.createElement('div');
            menu_component.classList.add('menu-component');
            yable_right_side.appendChild(menu_component)

            let component = document.createElement('div');
            component.classList.add('component');
            var text = document.createTextNode("menu");
            component.appendChild(text);
            menu_component.appendChild(component)

            yable_grid.appendChild(yable_right_side)
            ////////////////// yable_right_side /////////////////////

            //////////////////////////////////////////
            let yable_footer = document.createElement('div');
            yable_footer.classList.add('yable-footer');
            ///////////////////////////////////////////

            //let text = document.createTextNode('test');
            //div.appendChild(text);
            self.element.appendChild(yable_grid)
            self.element.appendChild(yable_footer)
        }
    }
    self.init()
    self.on()

    return self
}

