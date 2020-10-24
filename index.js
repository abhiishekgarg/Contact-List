const express = require("express"); //to use expressjs
const path = require("path"); //to use views with help of ejs
const port = 8000; //to initialize port

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express(); //to use expressjs

app.set('view engine', 'ejs'); //to use views with help of ejs
app.set('views', path.join(__dirname, 'views')); //to use views with help of ejs
app.use(express.urlencoded()); //to PUT data or you can say to read form data (but not the params)
app.use(express.static('assets')); //to include static files

// var contactList = 
// [
//     {
//         name: "Abhishek Garg",
//         phone: "9958985464"
//     }
// ];

app.get("/", function(req, res) //route statement
{
    // console.log(__dirname);
    // return res.render("home", 
    // {
    //     title: "My Contacts List",
    //     contact_list: contactList
    // });
    Contact.find({}, function(err, contacts)
    {
        if(err)
        {
            console.log("Error in fetching contacts from DB.");
            return;
        }
        return res.render("home", 
        {
            title: "My Contacts List",
            contact_list: contacts
        });


    });
});

app.post("/create-contact", function(req, res) //to set data
{
    Contact.create
    ({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact)
    {
        if(err)
        {
            console.log("Error in creating contact.");
            return;
        }

        console.log('*******', newContact);
        return res.redirect('back');
    });
    // contactList.push(req.body);
    // return res.redirect('back');
});

app.get("/delete-contact", function(req, res)
{
    // get the query from url
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1)
    // {
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');

    // get the id from query in the url
    let id = req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err)
    {
        if(err)
        {
            console.log("Error in deleting the object from database.");
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err) 
{
    if(err)
    {
        console.log("Error in running the server", err);
    }
    console.log("Yup! My Express Server is running on Port: ", port);
});