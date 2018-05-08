        // 1. 初始化数据
        var hashInit = init();
        var keys = hashInit["keys"];
        var hash = hashInit["hash"];

        // 2. 生成键盘
        //遍历keys，生成 kbd 标签
        generateKeyboard(keys,hash);
		
        // 3. 监听用户动作
        listenToUser(hash);

        //下面是工具函数
        function createSpan(content) {
            var span = tag('span');
            span.textContent = content;
            span.className = 'text';
            return span;
        }
        
        function createButton(id) {
            var button = tag('button');
            button.textContent = 'E';
            button.id = id;
            button.onclick = function (abc) {
                var button2 = abc.target;
                var img2 = button2.previousSibling;
                var key = button2.id;
                var x = prompt('请给我一个网址');

                hash[key] = x;
                
                img2.src = 'http://' + x + '/favicon.ico';
                img2.onerror = function (event) {
                    event.target.src = './p.png';
                }

                //hash 变更后，存入localStorage
                localStorage.setItem('zzz', JSON.stringify(hash));
            }

            return button;
        }

        function createImage(doamin) {
            var img = tag('img');
            if (doamin) {
                img.src = 'http://' + doamin + '/favicon.ico';
            }
            else {
                img.src = './p.png';
            }
            img.onerror = function (event) {
                event.target.src = './p.png';
            }
            
            return img;
        }
        
		function tag(tagName, attributes) {
            return document.createElement(tagName);
        }

        function getFromLocalStorage(name) {
        	return JSON.parse(localStorage.getItem(name) || 'null');
        }

        function init() {
            var keys = {
                '0': {0: 'q',1: 'w',2: 'e',3: 'r',4: 't',5: 'y',6: 'u',7: 'i',8: 'o',9: 'p',length: 10},
                '1': {0: 'a',1: 's',2: 'd',3: 'f',4: 'g',5: 'h',6: 'j',7: 'k',8: 'l',length: 9},
                '2': {0: 'z',1: 'x',2: 'c',3: 'v',4: 'b',5: 'n',6:'m',length: 7},
                'length': 3
            }

            var hash = {'a':'apple.com','c':'coolshell.cn','r':'ruanyifeng.com','q': 'www.qq.com','w':'wallhaven.cc','v': 'www.v2ex.com','x':'xiedaimala.com','z': 'www.zhihu.com'}

            //取出 localStorage 中zzz对应的hash
            var hashInLocalStorage = getFromLocalStorage('zzz');
            if (hashInLocalStorage) {
                hash = hashInLocalStorage;
            }

            return {
                "keys": keys,
                "hash": hash
            }
        }


        function generateKeyboard(keys,hash) {
            for (var i = 0; i < keys['length']; i++) {
                var div = tag('div');
                div.className = 'row';

                main.appendChild(div);
                
                var row = keys[i];
                for (var j = 0; j < row['length']; j++) {
                    
                    var span = createSpan(row[j]);
                    
                    var button = createButton(row[j]);
                    
                    var img = createImage(hash[row[j]]);
                                                   
                    var kbd = tag('kbd');
                    kbd.className = 'key';

                    kbd.appendChild(span);
                    kbd.appendChild(img);
                    kbd.appendChild(button);

                    div.appendChild(kbd);
                }
            
            }
        }


        function listenToUser(hash) {
            document.onkeypress = function (xyz) {
                var key = xyz['key'];
                var website = hash[key];
                //location.href = 'http://' + website;
                window.open( 'http://' + website , '_blank');
            }
        }
        
        
