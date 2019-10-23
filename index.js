var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		console.log('Received Event: ' + id);
		
		var btn = document.getElementById('givenNameBtn');
		var sbtn = document.getElementById('searchBtn');
		
		btn.addEventListener('click', addContact, false);
		sbtn.addEventListener('click', listContacts, false);

		//addContact();  // call without a click
		//listContacts(); // call without a click
    } 
};

function addContact()
{
	var gnBox = document.getElementById('givenName').value;
	var fnBox = document.getElementById('familyName').value;
	var workBox = document.getElementById('workNum').value;
	var mobileBox = document.getElementById('mobileNum').value;
	var homeBox = document.getElementById('homeNum').value;
	
	var myContact = navigator.contacts.create({"displayname" : "The New Contact"});
	var name = new ContactName();
	
	if (gnBox)
		name.givenName = gnBox;
	else
		name.givenName = "Aardvark"; // providing a default string
	
	if (fnBox)
		name.familyName = fnBox;
	else
		name.familyName = "Anteater"; // providing a default string
	
	console.log(name);
	myContact.name = name;
	
	var phoneNums = [];
		// original with literals (that could be used as defaults)
		//phoneNums[0] = new ContactField('work', '1234567890', false);
		//phoneNums[1] = new ContactField('mobile', '2345678901', true); // preferred
		//phoneNums[2] = new ContactField('home', '3456789012', false);
		
	var i = 0;
	if (workBox)
		phoneNums[i++] = new ContactField('work', workBox, false);
	if (mobileBox)
		phoneNums[i++] = new ContactField('mobile', mobileBox, true);
	if (homeBox)
		phoneNums[i++] = new ContactField('home', homeBox, false);
	// else we just don't set them
	
    console.log(phoneNums);
	myContact.phoneNumbers = phoneNums;
	
	myContact.save(onSaveContactSuccess, onSaveContactError);
}

function onSaveContactSuccess(contact)
{
	console.log("Successful save: " + contact);
}

function onSaveContactError(error)
{
	console.log("Save error: " + error.code);
}

function listContacts()
{
	var options = new ContactFindOptions();
	
	var spattern = document.getElementById('searchPattern').value;
	
	if (spattern)
		options.filter = spattern;
	else
		spattern = ""; // list all
	
	console.log("search contacts for" + spattern);
	
	options.multiple = true;
	var fields = ["*"]; // all fields
	
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts)
{
	var myDiv = document.getElementById("contacts-list");
	myDiv.innerHTML = "<h3>Matched Contacts:</h3><ul>";
	for (var i=0; i < contacts.length; i++)
	{
		myDiv.innerHTML += "<li>" + contacts[i].name.formatted + "</li>";
	}
	myDiv.innerHTML += "</ul>"
}

function onError(error)
{
	console.log("find error: " + error.code);
}

