
var _tableId = "DataTables_Table_2";
var _totalColumnId = "__TotalColumn";

setInterval(function () {
  var table = window.document.getElementById(_tableId);

  if (!table) {
    return;
  }

  var totalColumn = window.document.getElementById(_totalColumnId);
  var trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  
  if (!totalColumn) {
    //Add head and foot
    table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].insertAdjacentHTML('beforeend', '<th id="' + _totalColumnId + '" class="ralign">Total</th>');
    table.getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].insertAdjacentHTML('beforeend', '<th></th>');
  }

  //When the table is updated by kraken, the tbody is wiped out but not the thead and tfoot.
  //That's why this has to be handled separately.
  if (trs[0].getElementsByTagName('td').length < 4){
    for (var i = 0; i < trs.length; i++) {
      trs[i].insertAdjacentHTML('beforeend', '<td class="ralign"></td>');
    }
  }

  for (var i = 0; i < trs.length; i++) {
    updateTotal(trs[i]);
  }
  

}, 3000);


function updateTotal(tr) {
  var tds = tr.getElementsByTagName('td');
  
  try {
    var balanceIsEuro = tds[tds.length-3].innerText.indexOf("€") >= 0;
    var balance = parseFloat(tds[tds.length-3].getAttribute('sort'));
    var rate = parseFloat(tds[tds.length-2].getAttribute('sort'));
    var totalTd = tds[tds.length-1];
    
    var totalNum = balanceIsEuro? balance : balance*rate;
    totalTd.innerHTML = "€" + totalNum.toFixed(3);
    
  } catch(e){
    tds[tds.length-1].innerHTML = "---";
  }

}


