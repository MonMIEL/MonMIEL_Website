/************************************************************************************************************
Form Input Slider
Copyright (C) 2005  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, Septebmer 2005
Owner of DHTMLgoodies.com


************************************************************************************************************/

var form_widget_amount_slider_handle = 'img/slider.png';
var form_widget_amount_slider_handle_disable = 'img/slider_off.png';
var form_widget_amount_slider_handle_auto = 'img/slider_auto.png';
var slider_handle_image_obj = false;
var sliderObjectArray = new Array();
var slider_counter = 0;
var slideInProgress = false;
var handle_start_x;
var event_start_x;
var currentSliderIndex;
var sliderHandleWidth = 9;

function form_widget_cancel_event()
{
	return false;
}
var type;
function getImageSliderHeight(){

    slider_handle_image_obj = new Image();
    if(type=="disable")
            slider_handle_image_obj.src = form_widget_amount_slider_handle_disable;
    else if (type=="auto")
        slider_handle_image_obj.src = form_widget_amount_slider_handle_auto;
    else
        slider_handle_image_obj.src = form_widget_amount_slider_handle;


	if(slider_handle_image_obj.width>0){
		return;
	}else{
		setTimeout('getImageSliderHeight()',50);
	}
}


function positionSliderImage(e,theIndex)
{

	if(!theIndex)theIndex = this.getAttribute('sliderIndex');
	var theValue = sliderObjectArray[theIndex]['formTarget'].value;
	if(!theValue.match(/^[0-9]*$/g))theValue=sliderObjectArray[theIndex]['min'] +'';
	if(theValue/1>sliderObjectArray[theIndex]['max'])theValue = sliderObjectArray[theIndex]['max'];
	if(theValue/1<sliderObjectArray[theIndex]['min'])theValue = sliderObjectArray[theIndex]['min'];
	sliderObjectArray[theIndex]['formTarget'].value = theValue;
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentValue = sliderObjectArray[theIndex]['formTarget'].value-sliderObjectArray[theIndex]['min'];
	handleImg.style.left = Math.round(currentValue * ratio) + 'px';
}



function adjustFormValue(theIndex)
{
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentPos = handleImg.style.left.replace('px','');
	sliderObjectArray[theIndex]['formTarget'].value = Math.round(currentPos / ratio) + sliderObjectArray[theIndex]['min'];

}

function initMoveSlider(e)
{

	if(document.all)e = event;
	slideInProgress = true;
	event_start_x = e.clientX;
	handle_start_x = this.style.left.replace('px','');
	currentSliderIndex = this.id.replace(/[^\d]/g,'');
	return false;
}
var total;

function startMoveSlider(e)
{
    if(document.all)e = event;
	if(!slideInProgress)return;
    var val;
    if(currentSliderIndex==1){
        total = +parseInt(document.getElementById("eol_txtfield").value) +parseInt(document.getElementById("pho_txtfield").value)+parseInt(document.getElementById("hyd_txtfield").value);
        }
    else if (currentSliderIndex==2){
        total = parseInt(document.getElementById("nuc_txtfield").value)+parseInt(document.getElementById("eol_txtfield").value) +parseInt(document.getElementById("hyd_txtfield").value);
        }
    else if (currentSliderIndex==3){
        total = parseInt(document.getElementById("nuc_txtfield").value) +parseInt(document.getElementById("pho_txtfield").value)+parseInt(document.getElementById("hyd_txtfield").value);
        }
    else if (currentSliderIndex==4){
        total = parseInt(document.getElementById("nuc_txtfield").value)+parseInt(document.getElementById("eol_txtfield").value) +parseInt(document.getElementById("pho_txtfield").value);
    }
    var leftPos = handle_start_x/1 + e.clientX/1 - event_start_x;
	if(leftPos<0)leftPos = 0;
	if(leftPos/1>sliderObjectArray[currentSliderIndex]['width'])leftPos = sliderObjectArray[currentSliderIndex]['width'];
    var val =leftPos/sliderObjectArray[currentSliderIndex]['width']*100;
    if((total+val)>100){
        leftPos =sliderObjectArray[currentSliderIndex]['width']*(-total+100)/100 ;
        document.getElementById('slider_handle5').style.left = '0px';
        document.getElementById('slider_blue5').style.width='0px';
        adjustFormValue(5);
        if(sliderObjectArray[5]['onchangeAction']){
            eval(sliderObjectArray[5]['onchangeAction']);
        }
    }
    else {
        document.getElementById('slider_handle5').style.left = sliderObjectArray[5]['width']*(100-(total+val))/100 + 'px';
        document.getElementById('slider_blue5').style.width= sliderObjectArray[5]['width']*(100-(total+val))/100 +'px';
        adjustFormValue(5);
        if(sliderObjectArray[5]['onchangeAction']){
            eval(sliderObjectArray[5]['onchangeAction']);
        }
    }
	document.getElementById('slider_handle' + currentSliderIndex).style.left = leftPos + 'px';
    document.getElementById('slider_blue'+currentSliderIndex).style.width=leftPos+'px';
	adjustFormValue(currentSliderIndex);
	if(sliderObjectArray[currentSliderIndex]['onchangeAction']){
		eval(sliderObjectArray[currentSliderIndex]['onchangeAction']);
	}
}

function stopMoveSlider()
{
	slideInProgress = false;
}

var sliderPreloadedImages = new Array();
sliderPreloadedImages[0] = new Image();
sliderPreloadedImages[0].src = form_widget_amount_slider_handle;


function form_widget_amount_slider(targetElId,formTarget,width,min,max,onchangeAction,typeT,valueinitial)
{
    type = typeT;

	getImageSliderHeight();


	slider_counter = slider_counter +1;
	sliderObjectArray[slider_counter] = new Array();
	sliderObjectArray[slider_counter] = {"width":width - sliderHandleWidth,"min":min,"max":max,"formTarget":formTarget,"onchangeAction":onchangeAction};

	formTarget.setAttribute('sliderIndex',slider_counter);
	formTarget.onchange = positionSliderImage;
	var parentObj = document.createElement('DIV');


	parentObj.style.height = '12px';	// The height of the image
	parentObj.style.position = 'relative';
	parentObj.id = 'slider_container' + slider_counter;
	document.getElementById(targetElId).appendChild(parentObj);

	var obj = document.createElement('DIV');
	obj.className = 'form_widget_amount_slider';
	obj.style.width = width + 'px';
	obj.id = 'slider_slider' + slider_counter;
	obj.style.position = 'absolute';
	obj.style.bottom = '0px';

    var obj2=document.createElement('DIV');
    if(type=='disable')
        obj2.className = 'form_widget_amount_slider_red';
    else
         obj2.className = 'form_widget_amount_slider_blue';
    obj2.style.width = width*valueinitial/100 + 'px';
    obj2.id = 'slider_blue' + slider_counter;
    obj2.style.position = 'absolute';
    obj2.style.bottom = '0px';
    var obj3=document.createElement('span');
    obj.appendChild(obj2);
    obj.appendChild(obj3);

    parentObj.appendChild(obj);

	var handleImg = document.createElement('IMG');
	handleImg.style.position = 'absolute';
	handleImg.style.left = '0px';
	handleImg.style.zIndex = 5;
	handleImg.src = slider_handle_image_obj.src;
	handleImg.id = 'slider_handle' + slider_counter;
    if(type=="normal")
	handleImg.onmousedown = initMoveSlider;

	parentObj.style.width = obj.offsetWidth + 'px';

	if(document.body.onmouseup){
		if(document.body.onmouseup.toString().indexOf('stopMoveSlider')==-1){
			alert('You allready have an onmouseup event assigned to the body tag');
		}
	}else{
		document.body.onmouseup = stopMoveSlider;
		document.body.onmousemove = startMoveSlider;
	}
	handleImg.ondragstart = form_widget_cancel_event;
	parentObj.appendChild(handleImg);
	positionSliderImage(false,slider_counter);


}