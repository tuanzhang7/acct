var express = require('express');
var router = express.Router();

var customers = [{ "Id": 6, "Name": "2ADVANCED PTE LTD", "Address": "10 Admiralty St #04-23,24\r\nNorth Link Building\r\nSingapore 757695", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr Freddy Khong", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 7, "Name": "3A SYSTEM (M & E) PTE LTD", "Address": "Blk 37 Defu Lane 10  #03-47\r\nSingapore 529214\r\n", "Phone": "6552 1259", "Fax": "6552 1760", "Email": "eddiegan@malafon.com.sg", "ContactName": "Eddie Gan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 8, "Name": "3A-COOL SERVICES PTE LTD", "Address": "Blk 37 Defu Lane 10  #03-47,\r\nSingapore 529214.", "Phone": "6552 1259", "Fax": "6552 1760", "Email": null, "ContactName": "Mr. Ang", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 9, "Name": "3G INTEGRATED PTE LTD", "Address": "Blk 2,  #03-501,\r\nDefu Lane 10,\r\nSingapore  539183\r\n", "Phone": "6281 0306", "Fax": "6281 0326", "Email": null, "ContactName": "Damien Chin", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 10, "Name": "3H AIRCONDITIONING ENGINEERING PTE LTD", "Address": "10Admiralty Street\r\n#04-78, North Link Building\r\nSingapore   757695", "Phone": "6483 5702", "Fax": "6483 5703", "Email": "th.yeow@3h-ac.com.sg", "ContactName": "Mr.Yeow Teck Huat/Ms Peggy", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 11, "Name": "5 FOOT WAY INN", "Address": "227 South Bridge Rd\r\nSingapore 058776", "Phone": "6223 8083", "Fax": "NULL", "Email": null, "ContactName": "Mr Wei Hao", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 12, "Name": "883 ENGINEERING PTE. LTD.", "Address": "15 Changi North Street 1\r\n#01-26 l-Lofts\r\nSingapore 498765", "Phone": "6256 8883 / 6256 2662", "Fax": "6256 8833", "Email": "munited@singnet.com.sg", "ContactName": "Mr Watson / Saifuls", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 13, "Name": "A  SENSOR TECH PTE LTD", "Address": "362 Upper Paya Lebar Road #01-14\r\nDa Jin Factory Building \r\nSingapore 534963", "Phone": "6287 7951", "Fax": "6287 7728", "Email": null, "ContactName": "Mr Sebastian Ong/ Kelvin Oh", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 14, "Name": "A & JN TECHNICAL SUPPORT PTE LTD", "Address": "No 11,Lok Yong Way\r\nSingapore 658077.", "Phone": "6265 1728", "Fax": "6877 0716/6265 6837", "Email": "otm_engg@pacific.net.sg", "ContactName": "Mr.Chye Joon Num", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 15, "Name": "A PLUS FOOD PLACE", "Address": "New Tech Park 151\r\nLor Chuan #02-12", "Phone": "9827 9310", "Fax": "NULL", "Email": null, "ContactName": "Mr Katherine", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 16, "Name": "A- STAR DATA STORAGE INSTITUTE", "Address": "Dsi  Building 5 Engineering Drive 1\r\n(Off Kent Ridge Crescent, Nus)\r\nSingapore 117608\r\n\r\n", "Phone": "6874 5089/6874 6600", "Fax": "6777 8517", "Email": null, "ContactName": "Mr Lim Kian Guan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 17, "Name": "A T FORKLIFT REPAIR & SERVICES", "Address": "Blk 331 Bukit Batok Streer 33#04-233\r\nSingapore 650331", "Phone": "NULL", "Fax": "6760 7765", "Email": null, "ContactName": "Mr See Ai Teck", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 18, "Name": "A.C.E TAI SOON (S) PTE LTD", "Address": "11 Lorong 15 Geylang \r\nSingapore 388604", "Phone": "6841 3998", "Fax": "NULL", "Email": null, "ContactName": "NULL", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 19, "Name": "A.K.ONG ENGINEERING PTE LTD", "Address": "No: 65 Sims Avenue \r\nYi Xiu Factory Building \r\n#01-09\r\nSingapore 387418", "Phone": "6846 1611", "Fax": "6842 1395", "Email": "akongeng@gmail.com", "ContactName": "Ms Joe", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 20, "Name": "A.MAX PTE LTD", "Address": "16 Kaki Bukit Crescent \r\nSingapore 416247", "Phone": "6449 9972", "Fax": "6445 1411", "Email": null, "ContactName": "Ms Esther", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 21, "Name": "A.P.E ELECTRICAL AND AIRECON ENGINEERING", "Address": "Blk 111#04-620\r\nTeck Whye Lane\r\nSingapore 680111", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr. David Tee", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 22, "Name": "a/a", "Address": "5A ENG KONG TERRACE\r\nSINGAPORE 598977", "Phone": "9099 2788", "Fax": "6750 2015", "Email": null, "ContactName": "TEO", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 23, "Name": "A/C-TPL", "Address": "No. 96 Mandai Estate \r\nSingapore 729927", "Phone": "6362 0660", "Fax": "6362 0770", "Email": null, "ContactName": "Kenny Ng", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 24, "Name": "A\\C", "Address": "19, Senoko Ave,\r\nSingapore 758308.", "Phone": "6365 2688", "Fax": "6365 5956", "Email": "eddiegan@malafon.com.sg", "ContactName": "Eddie Gan", "idmas_GST": 2, "GST": null, "Order": [] }, { "Id": 25, "Name": "AAA INTEGRATE PTE LTD", "Address": "Blk 63, #05-281\r\nCircuit Road\r\nSingapore 370063", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr KPC Gupthan", "idmas_GST": 2, "GST": null, "Order": [] }];
var customer = { "Id": 6, "Name": "2ADVANCED PTE LTD", "Address": "10 Admiralty St #04-23,24\r\nNorth Link Building\r\nSingapore 757695", "Phone": "NULL", "Fax": "NULL", "Email": null, "ContactName": "Mr Freddy Khong", "idmas_GST": 2, "GST": null, "Order": [] };
var invociesByCustomer = [{ "PaymentDetails": [], "OrderNumber": "000036", "CustomerId": 2, "SalesmanId": null, "OrderDate": "2014-01-10T00:00:00", "Id": 4, "OrderType": 0, "Remark": null, "GSTRate": 0.00, "Status": 3, "TotalAmount": 150.00, "TotalWithTax": 150.00, "AmountPaid": 0.00, "AmountOutstanding": 150.000000, "Modified": "2015-06-29T02:29:13.823", "ModifiedBy": "admin", "Customer": null, "Salesman": null, "OrderDetail": [] }, { "PaymentDetails": [], "OrderNumber": "000034", "CustomerId": 2, "SalesmanId": null, "OrderDate": "2013-09-04T00:00:00", "Id": 10, "OrderType": 0, "Remark": null, "GSTRate": 0.00, "Status": 3, "TotalAmount": 2150.00, "TotalWithTax": 2150.00, "AmountPaid": 0.00, "AmountOutstanding": 2150.000000, "Modified": "2015-06-29T02:29:13.98", "ModifiedBy": "admin", "Customer": null, "Salesman": null, "OrderDetail": [] }, { "PaymentDetails": [], "OrderNumber": "000027", "CustomerId": 2, "SalesmanId": null, "OrderDate": "2012-02-08T00:00:00", "Id": 12, "OrderType": 0, "Remark": null, "GSTRate": 0.00, "Status": 3, "TotalAmount": 230.03, "TotalWithTax": 230.03, "AmountPaid": 0.00, "AmountOutstanding": 230.030000, "Modified": "2015-06-29T02:29:14.027", "ModifiedBy": "admin", "Customer": null, "Salesman": null, "OrderDetail": [] }];
var invoice = { "PaymentDetails": [], "OrderNumber": "000037", "CustomerId": 3, "SalesmanId": null, "OrderDate": "2014-01-14T00:00:00", "Id": 5, "OrderType": 0, "Remark": null, "GSTRate": 0.00, "Status": 3, "TotalAmount": 200.00, "TotalWithTax": 200.00, "AmountPaid": 0.00, "AmountOutstanding": 200.000000, "Modified": "2015-06-29T02:29:13.853", "ModifiedBy": "admin", "Customer": { "Id": 3, "Name": "Hock Keong Engineering Pte Ltd", "Address": "No 71 Ubi Crescent\r\nExcalibur Centre #03-01\r\nSingapore 408571\r\n", "Phone": "68485901", "Fax": "68485903", "Email": null, "ContactName": null, "idmas_GST": 2, "GST": null, "Order": [] }, "Salesman": null, "OrderDetail": [{ "Id": 5, "OrderId": 5, "Description": "\"Quotation System\" Maintainance & Support Fee Jan 2014- Dec 2014", "Qty": 1.00, "UnitPrice": 200.00, "Discount": 0.00, "LineTotal": 200.00 }] };
var GSTs = [{ "Id": 1, "Code": "00", "Rate": 0.00 }, { "Id": 2, "Code": "07", "Rate": 7.00 }];
var monthlyTotal = [{ "month": "Jan-14", "total": 350.00 }, { "month": "Feb-14", "total": 250.00 }, { "month": "Mar-14", "total": 2600.00 }, { "month": "Oct-14", "total": 550.00 }, { "month": "Jan-15", "total": 900.00 }, { "month": "Jun-15", "total": 900.00 }, { "month": "Aug-15", "total": 3500.00 }];
var yearlyTopCustomer = [{ "customer": "FLY 2000 SPORTS PTE ", "total": 1950.0 }, { "customer": "NCS Pte. Ltd", "total": 900.0 }, { "customer": "PAW LECK ENGINEERING", "total": 550.0 }, { "customer": "Hock Keong Engineeri", "total": 200.0 }, { "customer": "Singapore Weiqi Asso", "total": 150.0 }, { "customer": "Others", "total": 0.0 }];
var yearlyTopSalesman = [{ "salesman": null, "total": 3750.0 }, { "salesman": "Others", "total": 0.0 }];
var dashBoard = { "OpenInvOutstandingAmount": 0.0, "TotalNumOfOpenInv": 0, "ReceivedAmount": 0.00, "TotalNumOfPaidInv": 1 };

router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});
///api/Dashboard
router.route('/Dashboard')
    .get(function (req, res) {
	res.json(dashBoard);
});
//customer=========================
router.route('/customer')
    // create a bear (accessed at POST /api/customer)
    .post(function (req, res) {
	var customer = req.body;
	
	res.json(customer);
        
})
	// get all the customer (accessed at GET /api/customer)
	.get(function (req, res) {
	var paginationHeader = 
	 {
		TotalCount : 120,
		TotalPages : 10
	};
	res.header('X-Pagination', JSON.stringify(paginationHeader));
	res.json(customers);
});
//chech /cusgtomer/lookup before /customer/:id to solve conflict
router.route('/customer/lookup')
    .get(function (req, res) {
	//var q = req.params.q
	var limit = req.query.limit
	var q = req.query.q

	var arrayFound = customers.filter(function (item) {
		return item.Name.toLowerCase().indexOf(q.toLowerCase()) > -1;
	});
	if (limit === undefined || limit === null) {
		limit = 5;
	}
	var returnArray = arrayFound.slice(0, limit);
	
	var result = [];
	returnArray.forEach(function (o) {
		var newObj = {
			id: o.Id,
			value: o.Name
		};
		result.push(newObj);
	});

	res.json(result);
});

router.route('/customer/:id/balance')
    .get(function (req, res) {
	var balance = 100 + req.params.id
	res.json({ "balance": balance });
});

//customer/10
router.route('/customer/:id')
    .get(function (req, res) {
	var id = req.params.id
	var arrayFound = customers.filter(function (item) {
		return item.Id == id;
	});
	res.json(arrayFound[0]);
});

//Invoice=========================
router.route('/invoice')
    // create a bear (accessed at POST /api/invoice)
    .post(function (req, res) {
	var customer = req.body;
	
	res.json(customer);
        
})
	// get all the invoice (accessed at GET /api/invoice)
	.get(function (req, res) {
	var paginationHeader = 
 {
		TotalCount : 120,
		TotalPages : 10
	};
	res.header('X-Pagination', JSON.stringify(paginationHeader));
	res.json(invoices);
});
router.route('/invoice/:id')
    .get(function (req, res) {
	res.json(invoice);
});
router.route('/invoice/customer/:id')
    .get(function (req, res) {
	res.json(invociesByCustomer);
});
router.route('/invoice/GetYearlyTopCustomer/:year')
    .get(function (req, res) {
	res.json(yearlyTopCustomer);
});
router.route('/invoice/GetYearlyTopSalesman/:year')
    .get(function (req, res) {
	res.json(yearlyTopSalesman);
});
router.route('/invoice/GetMonthlyTotal/:year')
    .get(function (req, res) {
	res.json(monthlyTotal);
});

//GST=========================
router.route('/GST')
    .get(function (req, res) {
	res.json(GSTs);
});
module.exports = router;