function createRow(name, location, age, date){
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var ceil5 = row.insertCell(4);
    
    
    cell1.innerHTML = name;
    cell2.innerHTML = location;
    cell3.innerHTML = age;
    cell4.innerHTML = date;
    ceil5.innerHTML = '<button type="button" class="btn btn-success" value="delete" onclick="deleteFunction(this)">Resolve</button><button type="button" class="btn btn-secondary" value="location" onclick="findLocation(this)">Location</button>'
    
}

function deleteFunction(r){
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}

function findLocation(l){
    var j = l.parentNode.parentNode.rowIndex;
    
    document.getElementById("myTable").rows[j].cells[0].innerHTML;
 
    
    var locations = {"id": "0001", "position": [51.081018, -114.122202], "status": "unsolved", "video": "https://www.youtube.com/embed/aEzZLXBH3rU"};
    
    return locations;
}