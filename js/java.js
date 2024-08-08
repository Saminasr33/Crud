let category = document.getElementById('category');
let ddlcategory = document.getElementById('ddlcategory');
let product = document.getElementById('product');
let quntiry = document.getElementById('quntiry');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let bodycate = document.getElementById('bodycate');
let delall = document.getElementById('delall');
let btnmod = document.getElementById('btnmod');
let mood = 'create';
let tmp;

let categoryarry;

if (localStorage.category != null) {
    categoryarry = JSON.parse(localStorage.category);
} else {
    categoryarry = [];
}


function savecategory() {

    let objectcate = {
        category: category.value,
    };
    categoryarry.push(objectcate);
    localStorage.setItem('category', JSON.stringify(categoryarry));
    category.value = '';
    showitem();
    tabelcate();
    countotal();

}





// ......

function showitem() {
    let item = '';
    item += `<option value=''>select category........</option>
`
    for (let i = 0; i < categoryarry.length; i++) {
        item += `
         <option value='${i}'>${categoryarry[i].category}</option>

        `
    }
    ddlcategory.innerHTML = item;
    if (categoryarry.length > 1) {
        delall.style.display = 'block';
    } else {
        delall.style.display = 'none';
    }
}

// ......

function tabelcate() {
    let tabcate = '';
    for (let i = 0; i < categoryarry.length; i++) {
        tabcate += `
        <tr>
                                <td>${i + 1}</td>
                                <td>${categoryarry[i].category}</td>
                                <td>
                                    <button class="btn btn-danger" title="حذف" onclick="delecate(${i})"><i class="fa-solid fa-trash"></i> Delete</button>
                                </td>
                            </tr>
        `
    }
    bodycate.innerHTML = tabcate;
}



// ...

function delecate(id) {
    if (window.confirm('هل تريد الحذف') == true) {

        categoryarry.splice(id, 1);
        localStorage.category = JSON.stringify(categoryarry);
        tabelcate();
        showitem();
        countotal();

    }
}

// ... 
function delecateall() {

    if (

        window.confirm('هل تريد حذف كل البيانات') == true) {

        categoryarry.splice(0);
        localStorage.category = JSON.stringify(categoryarry);
        tabelcate();
        showitem();
        countotal();
    }
}

// ... 
function countotal() {
    document.getElementById('countcategory').innerHTML = `total ( ${categoryarry.length} )`
}

// ... 
function vallcategory() {
    let valid = true;
    if (category.value == '') {
        alert('please insert category name');
        valid = false;
    } else {
        savecategory();
        valid = true;
    }
    return valid;
}

// ... 
function gettotal() {
    if (price.value != '') {
        let result = (quntiry.value * price.value) - discount.value;
        total.value = result;
    } else {
        total.value = ''

    }
    if (total.value != 0) {

        total.style.background = 'green';
    } else {

        total.style.backgroundColor = 'red';
    }
}

// ...

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

function prodata() {
    let newpro = {
        category: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quntiry: quntiry.value,
        price: price.value,
        discount: discount.value,
        total: total.value,

    };
    if (mood === 'create') {
        datapro.push(newpro);


    } else {
        datapro[tmp] = newpro;
        btnmod.innerHTML = '<i class="fa-solid fa-download"></i>create';
        btnmod.classList.replace = 'btn btn-info w-25';
        btnmod.classList = 'btn btn-success w-25';
        mood = 'create';

    }
    clearinpt();

    localStorage.setItem('product', JSON.stringify(datapro));
    showtable();
    counttotal();
    window.scrollTo(0, document.body.scrollHeight);
};
// ... 
function clearinpt() {
    product.value = '';
    price.value = '';
    quntiry.value = '';
    discount.value = '';
    total.value = '';
    total.style.backgroundColor = 'red';
}
// ... 

function showtable() {
    let table = '';
    for (let j = 0; j < datapro.length; j++) {
        table += `
        <tr>
                            <td>${j + 1}</td>
                            <td>${datapro[j].category}</td>
                            <td>${datapro[j].product}</td>
                            <td>${datapro[j].quntiry}</td>
                            <td>${datapro[j].price}</td>
                            <td>${datapro[j].discount}</td>
                            <td>${datapro[j].total}</td>
                            <td>
                                <button class="btn btn-info" onclick='edit(${j})'><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger" onclick='deletable(${j})'><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
        `
    }
    document.getElementById('tableout').innerHTML = table;
    if (datapro.length > 1) {
        let deleallpro = document.getElementById('deleallpro');
        deleallpro.style.display = 'block';
    } else {
        deleallpro.style.display = 'none';

    }

}

// ... 
function deletable(id) {
    if (window.confirm('هل تريد الحذف') == true) {

        datapro.splice(id, 1);
        localStorage.product = JSON.stringify(datapro);

        showtable();
        counttotal();
    }

}

// ... 
function delealldata() {
    if (window.confirm('هل تريد حذف كل البيانات') == true) {

        datapro.splice(0);
        localStorage.product = JSON.stringify(datapro);
        showtable();
        counttotal();
    }
}
// ... 

function edit(z) {
    ddlcategory.options[ddlcategory.selectedIndex].text = datapro[z].category;
    product.value = datapro[z].product;
    price.value = datapro[z].price;
    quntiry.value = datapro[z].quntiry;
    discount.value = datapro[z].discount;
    total.value = datapro[z].total;
    mood = 'update';
    tmp = z;
    btnmod.innerHTML = '<i class="fa-solid fa-download"></i>update';
    btnmod.classList.replace = 'btn btn-success w-25';
    btnmod.classList = 'btn btn-info w-25';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    total.style.backgroundColor = 'green';


    // moodshow();
}
// ... 
function counttotal() {
    document.getElementById('counttitle').innerHTML = `-Total Product(${datapro.length})`;
}
// ... 
function errorcreate() {
    let ldcate = document.getElementById('ldcate');
    let lbprou = document.getElementById('lbprou');
    let lbproucount = document.getElementById('lbproucount');
    let lbprouprice = document.getElementById('lbprouprice');
    let vallid = true;

    if (ddlcategory.options[ddlcategory.selectedIndex].text === 'select category........') {
        ldcate.style.color = 'red';
        vallid = false;
    } else {
        ldcate.style.color = 'white';
        vallid = true;
    }

    if (product.value === '') {
        lbprou.style.color = 'red';
        vallid = false;
    } else {
        lbprou.style.color = 'white';
        vallid = true;

    }
    if (quntiry.value === '') {
        lbproucount.style.color = 'red';
        vallid = false;
    } else {
        lbproucount.style.color = 'white';
        vallid = true;

    }
    if (price.value === '') {
        lbprouprice.style.color = 'red';
        vallid = false;
    } else {
        lbprouprice.style.color = 'white';
        vallid = true;
    }

    if (ddlcategory.options[ddlcategory.selectedIndex].text != 'select category........' && product.value != '' && quntiry.value != '' && price.value != '') {
        prodata();

    }


    return vallid;
}

// ...
counttotal();
showtable();
countotal();
showitem();
tabelcate();
gettotal();
// $(document).ready(function () {
//     $('#tablpro').DataTable();
// });