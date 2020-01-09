var selectArea = document.querySelector('#selectList');
var hotArea = document.querySelector('.buttons');
var list = document.querySelector('.card-wrap');

// var data = [];
// var len;


var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function(){
    //console.log(xhr.responseText); 
    data = JSON.parse(xhr.responseText).result.records;
    len = data.length;
    addopt();   
    //updateList();
}

function addopt(){
    var opt=[];
    var str = `<option value="--請選擇行政區域--">--請選擇行政區域--</option>`;
    data.forEach(function(obj){
        if(opt.indexOf(obj.Zone) == -1){
            opt.push(obj.Zone);
        }
    });
    for(var i=0; i<opt.length; i++){
        str += `<option value="${opt[i]}">${opt[i]}</option>`;
    }
    selectArea.innerHTML = str;    
}

function updateList(zoneItem){
    var str2 = '';
    for (var k = 0; k < len; k++) {
        if (zoneItem == data[k].Zone) {
            str2 += `
                    <div class="card">
                        <div class="card-img"
                            style="background-image: url(${data[k].Picture1})">
                            <span class="place">${data[k].Name}</span>
                            <span class="zone-span">${data[k].Zone}</span>
                        </div>
                        <div class="card-body">
                            <ul class="info">
                                <li class="clock">
                                    <img src="img/icons_clock.png" width="18" height="18" alt="">
                                    <span class="time">${data[k].Opentime}</span>
                                </li>
                                <li class="add">
                                    <img src="img/icons_pin.png" width="16" height="20" alt="">
                                    <span class="address">${data[k].Add}</span>
                                </li>
                                <li class="third">
                                    <img src="img/icons_phone.png" width="12" height="20" alt="">
                                    <span class="tel">${data[k].Tel}</span>
                                </li> 
                `;
            if(data[k].Ticketinfo == ''){
                str2 +=`</ul></div></div>`;
            }else if(data[k].Ticketinfo !== ''){
            
                str2 += `<li class="ticket">
                <img src="img/icons_tag.png" width="18" height="18" alt="">
                <span class="tag">${data[k].Ticketinfo}</span></li></ul></div></div>`;
                
            } 
        }      
    }  
    list.innerHTML = `<h2 class="zone-h2">${zoneItem}</h2><div class="content">${str2}</div>`;     
}

selectArea.addEventListener('change',selectZone,false);
function selectZone(e) {
    var select = e.target.value;
    if (select == '--請選擇行政區--') {
        alert('您尚未選擇行政區域');
        text.innerHTML = '';
        return;
    }
    updateList(select);
}

hotArea.addEventListener('click',selectHot,false);
function selectHot(e){
    var select = e.target.value;
    if(e.target.nodeName !=='BUTTON')return;
    updateList(select);
}


