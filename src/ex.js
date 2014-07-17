"use strict";

function Node(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

function createArray(size){
    var array = [];
    var num;
    while(array.length < size){
        num = _.random(0,400);// Math.floor((Math.random() * 10000));
        if (array.indexOf(num) == -1){
            array.push(num);
        }
    }
    return array;
}

function add(node, tree, whichSide){
    if (tree === null) {
       tree = node;
    }
    else {
        var side = whichSide(tree.data , node.data);
        if (tree[side]) {
            add(node, tree[side], whichSide)
        }
        else {
            tree[side] = node
        }
    }
    return tree;
}


function printTree(tree){
    var toPrint='';
    var arrToPrint = [];
    var temp;
    if (tree === null)
        return;
    var arr = [];
    arr.push(tree);
    arr.push(0);

    while(arr.length>0 ){
        if(arr[0]==0)
            break;

        while(arr[0]!=0 ) {
            temp = arr.shift();
            if (temp == 1) {

                toPrint = toPrint + 'n' + ' ';
            }
            else {
                toPrint = toPrint + temp.data + ' ';
                if (temp.left)
                    arr.push(temp.left);
                else
                    arr.push(1);

                if (temp.right)
                    arr.push(temp.right);
                else
                    arr.push(1)
            }
        }
        arrToPrint.push(toPrint);
        console.log(toPrint);
        toPrint = '';
        temp = arr.shift();
        arr.push(0);
    }
    return arrToPrint;
}
function whichSideReg(tree, node){
    if (tree > node) {
        return 'left';
    }
    else {
        return 'right';
    }
}

var arr = createArray(202);
var root = null;

arr.forEach(function(entry) {
    var node = new Node(entry);
    root = add(node, root, whichSideReg);
});

var arrToPrint = printTree(root);
var longestLine = arrToPrint[0].length;

arrToPrint.forEach(function(item) {
   if (item.length>longestLine)
        longestLine = item.length;

});

longestLine/=2;

arrToPrint.forEach(function(item) {
    var pad = longestLine - item.length/2;
    //item.lpad(' ', pad);
    //console.log(item);
});

//console.log(callbacks.join());
