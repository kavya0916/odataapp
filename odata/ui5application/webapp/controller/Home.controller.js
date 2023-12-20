sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("ui5application.controller.Home", {
            DetailPopUp:null,
            UserData:[],
            onInit: function () {

            },
            onAfterRendering:function(){
                debugger
                var oModel = new sap.ui.model.json.JSONModel();
                this.getOwnerComponent().getModel().read("/ZKA_USERSSet", {
                    success: function (oData, response) {
                        debugger
                        // Assuming that the data you want is in the 'results' property
                        oModel.setData(oData.results);
                    },
                    error: function (error) {
                        console.error("Error loading data: " + error);
                    }
                    
                });
                 this.getView().setModel(oModel, "userdata");
            },
            oClick:function()
            {
                
                        this.DetailPopUp = new sap.ui.xmlfragment("ui5application.utils.signup",this);
                        this.getView().addDependent(this.DetailPopUp);
                        
                        this.DetailPopUp.open();
                        
                        this.DetailPopUp.rerender();
                        this.DetailPopUp.open();

            },
            oClose:function()
            {
                this.DetailPopUp.close()
                sap.ui.getCore().byId('IdPanel').setVisible(false)
                this.DetailPopUp.destroy(true);

            },
            
          
            oLogin:function()
            {
               
                debugger
                var Username = this.getView().byId('Username').getValue()
                var Password = this.getView().byId('Password').getValue()
                
                var oModel = this.getView().getModel("userdata")
                var userData= [];
                var userlog=Username; 
                var oLogData = this.getView().getModel().oData["ZKA_USERSSet('"+userlog+"')"]

                if(Username=='Admin' && Password=='123' )
                {
                       
                        this.getOwnerComponent().getRouter().navTo("AdminPage",false);
                        sap.m.MessageToast.show('Welcome Admin!!')
                        this.getView().byId('Username').setValue("")
                        this.getView().byId('Password').setValue("")

                        
                } 
                 else if(Username=='' && Password=='')
                {
                    this.getView().byId('Username').setValueState('Error')
                    this.getView().byId('Username').setValueStateText("Enter your user Id")
                    this.getView().byId('Password').setValueState('Error')
                    this.getView().byId('Password').setValueStateText("Enter you Phone number")
                }
                else if(Username=='')
                {
                    this.getView().byId('Username').setValueState('Error')
                    this.getView().byId('Username').setValueStateText("Enter your user Id")

                }
                else if(Password=='')
                {
                    this.getView().byId('Password').setValueState('Error')
                    this.getView().byId('Password').setValueStateText("Enter you Phone number")


                }
                else if(oLogData.Userid  == Username && Password == oLogData.Phone  )
                {
                    debugger
                    var user={};
                    user.Userid = oLogData.Userid
                    user.Email=oLogData.Email
                    user.Name=oLogData.Name
                    user.Phone=oLogData.Phone
                    user.City=oLogData.City
                    user.State=oLogData.State
                    
    
                    localStorage.setItem('currUser',JSON.stringify(oLogData))
                    sap.m.MessageToast.show("Welcome to User page")
                    
                    this.getOwnerComponent().getRouter().navTo("ConsumerPage",{
                        id:oLogData.Userid
                    })
                    this.getView().byId('Username').setValue("")
                    this.getView().byId('Password').setValue("")
                } 
               
                
            },
           
            UserName:function()
            {
                this.getView().byId('Username').setValueState('None')
            },
            Password:function()
            {
                this.getView().byId('Password').setValueState('None')
            },
            SignupUserName:function()
            {
                sap.ui.getCore().byId('UserName').setValueState('None')
            },
            SignupUserPhone:function()
            {
                sap.ui.getCore().byId('UserPhone').setValueState('None')
            },
            SignupUserEmail:function()
            {
                sap.ui.getCore().byId('UserEmail').setValueState('None')
            },

            oCreateAccount:function()
            {
                debugger
                var UserName = sap.ui.getCore().byId('UserName').getValue()
                var UserPhone =  sap.ui.getCore().byId('UserPhone').getValue()
                var UserEmail = sap.ui.getCore().byId('UserEmail').getValue()
                var UserState = sap.ui.getCore().byId('UserState').getValue()
                var UserCity = sap.ui.getCore().byId('UserCity').getValue()
                var rand=Math.random()*100;
                var rand2= Math.trunc(rand)
                var UserID = "U00"+rand2+UserPhone[7]+UserPhone[8]+UserPhone[9]
                

                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

                if(!(NameVal.test(UserName)))
                {
                    sap.ui.getCore().byId("UserName").setValueState("Error")
                    sap.ui.getCore().byId('UserName').setValueStateText("Minimum 3 and Max 25 letters required")

                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")                   
                
                }
                else if(!(PhoneVal.test(UserPhone)))
                {
                
                    sap.ui.getCore().byId("UserPhone").setValueState("Error")
                    sap.ui.getCore().byId('UserPhone').setValueStateText("Number Must begin 6/7/8/9 and 10 digit length")

                    sap.ui.getCore().byId("UserName").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")  
                }
                else if(!(EmailVal.test(UserEmail)))
                {
                    sap.ui.getCore().byId("UserEmail").setValueState("Error")
                    sap.ui.getCore().byId('UserEmail').setValueStateText("Enter proper email id")

                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")
                    sap.ui.getCore().byId("UserName").setValueState("None")

                }
                else if(UserCity == '')
                {
                    sap.ui.getCore().byId("UserCity").setValueState("Error")
                    sap.ui.getCore().byId('UserCity').setValueStateText("Enter City")

                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserName").setValueState("None")

                }
                else if(UserState == '')
                {
                    sap.ui.getCore().byId("UserState").setValueState("Error")
                    sap.ui.getCore().byId('UserState').setValueStateText("Select state")
                    
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")


                }
                
                else{
                    var all_records = new Array()
                    all_records=JSON.parse(localStorage.getItem("allRecords"))?JSON.parse(localStorage.getItem("allRecords")):[]
                    if(all_records.some((v)=>{return v.email==UserEmail && v.phone==UserPhone}))
                    {
                      alert("duplicate data");
                    }
                    else{

                        debugger
                        sap.ui.getCore().byId('UserIdText').setText(UserID)
                
                        sap.ui.getCore().byId('IdPanel').setVisible(true)                   

                        all_records.push({
                            "name":UserName,
                            "phone":UserPhone,
                            "email":UserEmail,
                            "state":UserState,
                            "city":UserCity,
                            "userId":UserID
                        })

                        localStorage.setItem("allRecords",JSON.stringify(all_records));

                        var userData = {}
                        userData.Userid = UserID
                        userData.Name = UserName
                        userData.Phone = UserPhone
                        userData.Email = UserEmail
                        userData.City = UserCity
                        userData.State = UserState

                        
                        this.getView().getModel().create("/ZKA_USERSSet",userData,{
                            method:"POST",    
                            success:function (data){
                                debugger
                                MessageToast.show("User Created Successfully");
                            },
                            error: function (data){
                                MessageToast.show(data);
                            },
                            });

                      

                    }

                        this.onAfterRendering();


                }        
        
            }
        });
    });
