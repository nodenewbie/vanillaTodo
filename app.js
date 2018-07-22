(function () {
    "use strict";
    document.addEventListener('DOMContentLoaded', function () {
        //Vanilla JS plain JS.
        var data =  {
            0:{"title":'test1', "done":true,"due": "22/06/2018"},
            1:{"title":'test2', "done":false,"due": "22/06/2018"},
            2:{"title":'test1', "done":true,"due": "22/06/2018"},
        };
        var deletedItems = [];
        ////////////////// data above ///////////////////////////

        var rowItems =  addTodoRowToList(data);

        console.dir(rowItems);

        makeLiClickableTxtBoxes();

        function makeLiClickableTxtBoxes () {
            var labels = document.getElementsByClassName('listitem');
            [].forEach.call(labels, (li)=>{
                li.addEventListener('click', clickLiShowTxt);
                console.log(li);
            });
        }

        function clickLiShowTxt(t) {
            var li = t.target;
            console.log("li coming");
            console.dir(li);
            var textBox = li.lastChild;
            var label = li.childNodes[1];
            label.hidden = true;
            textBox.hidden = false
            textBox.focus();
        }     

        //var undoBtn = document.getElementById('undoBtn');
        document.getElementById('undoBtn').addEventListener('click', function () {
            var lastaction = deletedItems.splice(-1,1);
            lastaction[0] && lastaction[0].classList.remove('hidden');
            //delete data[lastaction[0].id].state;
        });


        function addTodoRowToList(todoArr) {
            var  listElement = document.getElementById('todolist');
            var todoRows = [];
            var x = 0;
            for (var item in todoArr) {
                var title = todoArr[item].title;
                var labelField = createItemRow("label", title, 'todoli');

                var deleteSpanBtn = createItemRow('span', ""); //createItemRow('span', "Delete Me");
                deleteSpanBtn.setAttribute('id',''+x);
                deleteSpanBtn.classList.add("bin");
                deleteSpanBtn.classList.add('fas');
                deleteSpanBtn.classList.add('fa-trash-alt');
                _addClickDeleteListener(deleteSpanBtn);

                var li = createItemRow("li", '', 'listitem');
                li.prepend(deleteSpanBtn);//ad delte to item
                li.append(labelField);
                //dd txt here and hide it 
                var txt = createItemRow("input", '','','text');
                txt.addEventListener('focusout', hideTxtShowLbl);
                txt.hidden = true;

                listElement.append(li); //then add list itemto list
                li.append(txt);
                //    txt.focus();
                x++;
            };
            return todoRows;
        }

        function _addClickDeleteListener(btn) {
            //  items.forEach((item) => {
            btn.addEventListener('click', function(event) {
                console.log("thus is...");        console.dir(this);        console.dir(event);        console.log(this.id);
                //set the data object valu to deleted
                //data[this.id].state = "deleted";
                this.parentElement.classList.add('hidden');
                deletedItems.push(this.parentElement);             
            });
        }


        function hideLblShowText(t) {
            var li = t.target;
            var input = li.nextElementSibling;
            console.dir(input);
            var label = input.previousElementSibling;
            label.hidden = true;
            input.hidden = false
            input.focus();
        }


        function hideTxtShowLbl(focusevent) {
            var input =focusevent.target;
            var lbl = input.previousSibling;
            input.hidden = true;
            console.dir(focusevent);
            lbl.hidden=false;
            lbl.textContent = input.value;//"weeeeee";
        }  


        function createItemRow(elementType, title, htmlClass, typew) {
            var node = document.createElement(elementType);
            //li.setAttribute('id',''+x);
            node.innerHTML = title;
            if (typew) node.type=typew;
            if(htmlClass) node.classList.add(htmlClass);
            return node;
        }


    },false);
})();
