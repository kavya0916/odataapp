sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"

], function (
        Controller,MessageToast
) {
        "use strict";

        return Controller.extend("ui5application.controller.Admin", {
                TicketPopUp: null,
                /**
                 * @override
                 */
                AdminAddFragment: null,
                CarImage: null,
                CarLogo: null,
                dataArr: [],
                ticketArr: [],
                soldcars: null,
                oTicketArr: [],
                onInit: function () {


                },
                /**
                 * @override
                 */
                onAfterRendering: function() {
                        var that = this;
                        var oModel = new sap.ui.model.json.JSONModel();
                        this.getOwnerComponent().getModel().read("/ZCarDetailsSet", {
                            success: function (oData, response) {
                                debugger
                                oModel.setData(oData.results);
                            },
                            error: function (error) {
                                console.error("Error loading data: " + error);
                            }
                            
                        });
                         this.getView().setModel(oModel, "cardata");
                        var oDataModel=this.getView().getModel().read('/ZTicketsSet',{
                                method:"GET",
                            success:function(oData,response){
                                var tickets=[]
                                tickets=oData.results
                                var myArr=[]
                                
                                tickets.forEach((ele, ind)=>{
                                    debugger
                                    var newObj={}
                                    newObj.pId='2222'
                                    newObj.pcat=ele.ProductCategory
                                    newObj.pname=ele.SWIFT
                                    newObj.pmodel=ele.ProductModel
                                    newObj.pQty=ele.ProductQuantity
                                    newObj.status='Pending'
            
                                    myArr.push(newObj)
                                })
                                
                                var tModel=that.getView().getModel('ticket')
                                tModel.setData({newTickets:myArr})
                            },
                            error:function(){
                                MessageToast.show('Failed to Read Model')
                            }
                            })
            
                        
                
                },
                colorFormatter: function (value)// to formating model quantity 
                {
                        if (value <= 5) {
                                return "Error"
                        }
                        else if (value >= 6 && value <= 10) {
                                return "Warning"
                        }
                        else {
                                return "Success"
                        }
                },
                oSoldCars: function ()// pie chart fragment popup
                {
                        if (!this.soldcars) {
                                this.soldcars = new sap.ui.xmlfragment("ui5application.fragments.solditems", this)
                                this.getView().addDependent(this.soldcars)
                        }

                        this.soldcars.open()


                },
                oSoldClose: function ()//pie chart closs and solditems close button
                {
                        this.soldcars.close()
                        // this.soldcars.destroy(true)
                },
                AdminAddItems: function () //new car adding fragment in admin
                {

                        this.AdminAddFragment = new sap.ui.xmlfragment("ui5application.fragments.Adminadditems", this);
                        this.getView().addDependent(this.AdminAddFragment)

                        this.AdminAddFragment.open()
                },
                oClose: function () {
                        this.AdminAddFragment.close()
                        this.AdminAddFragment.destroy(true);

                },
                cardetailpopup: null,
                oItemSelect: function (oEvent)//car specification fragment
                {

                        this.cardetailpopup = new sap.ui.xmlfragment("ui5application.utils.cardetailpopup", this);
                        this.getView().addDependent(this.cardetailpopup);

debugger
                        var vBindItem = oEvent.mParameters.listItem.mProperties.numberUnit
                        var vBindItem1 = vBindItem.split(" ")[4]
                        var itemPath = "ZCarDetailsSet(" + "'" + vBindItem1 + "'" + ")"
                        var spath = this.getView().getModel().oData[itemPath]

                        var oModel = this.getView().getModel("carDetaisPopup")

                        var carDetails = {
                                "Name": spath.Brandname,
                                "Airbags": spath.Airbags,
                                "Engine": spath.Engine,
                                "Fuel": spath.Fueltype,
                                "Id": spath.Carid,
                                "Mileage": spath.Milage,
                                "Price": spath.Price,
                                "Qty": spath.Quantity,
                                "Seat": spath.Seatingcapacity,
                                "Title": spath.Title,
                                "Transmission": spath.Transmission,
                                "Type": spath.Cartype
                        }
                        oModel.setData(carDetails)
                        this.getView().setModel(oModel)
                        this.popupElementID = spath.Id
                        this.cardetailpopup.open();
                },
                oCarClose: function () {
                        this.cardetailpopup.close();
                        this.cardetailpopup.destroy(true);
                        location.reload()


                },
                LogOff: function () {
                        var oRouter = this.getOwnerComponent().getRouter()
                        oRouter.navTo("RouteHome")
                },
                oTicketPopUp: function () {


                        this.TicketPopUp = new sap.ui.xmlfragment("ui5application.fragments.ticket", this);
                        this.getView().addDependent(this.TicketPopUp);


                        this.TicketPopUp.rerender();

                        this.TicketPopUp.open();

                },
                oTicketSelected: function (oEvent) {
                        this.oTicketArr = oEvent.oSource._aSelectedPaths

                },
                oTicketAccept: function ()// new ticket Accept function
                {

                        var oModelArr = new Array()

                        var oTicketArr = new Array()
                        oTicketArr = this.getView().getModel("ticket").oData.newTickets
                        for (var i = 0; i <= this.oTicketArr.length - 1; i++) {
                                var sPath = this.oTicketArr[i]
                                sPath = sPath.split("/")[2]
                                var Qty = this.getView().getModel("ticket").oData.newTickets[sPath].pQty
                                var Name = this.getView().getModel("ticket").oData.newTickets[sPath].pmodel
                                var oModelArr = this.getView().getModel("search").oData.Cars

                                if (oTicketArr[sPath].status == "Accepted") {
                                        sap.m.MessageToast.show("Already Accepted.!")
                                }

                                else {
                                        for (var i = 0; i <= oModelArr.length - 1; i++) {


                                                if (oModelArr[i].title == Name) {
                                                        if (oModelArr[i].qty >= Qty) {
                                                                //    this.getView().getModel("ticket").oData.newTickets[sPath].status ="Accepted"
                                                                oTicketArr[sPath].status = "Accepted"
                                                                var num = oModelArr[i].qty
                                                                num = num - Qty
                                                                oModelArr[i].qty = num

                                                        }
                                                        else {

                                                                //    this.getView().getModel("ticket").oData.newTickets[sPath].status ="Rejected"
                                                                oTicketArr[sPath].status = "Rejected"

                                                        }
                                                }

                                        }

                                        sap.m.MessageToast.show('Ticket Accepted')

                                }
                                var oSearchModel = this.getView().getModel("search")
                                oSearchModel.setData(oModelArr, "Cars")

                                var oTicketModel = this.getView().getModel("ticket")
                                oTicketModel.setData(oTicketArr, "newTickets")

                        }

                        this.TicketPopUp.rerender();
                        this.TicketPopUp.close();

                },
                oTicketReject: function () //new ticket Accept function
                {
                        var oTicketArr = new Array()
                        oTicketArr = this.getView().getModel("ticket").oData.newTickets
                        var sPath;
                        for (var i = 0; i <= this.oTicketArr.length - 1; i++) {
                                sPath = this.oTicketArr[i]
                                sPath = sPath.split("/")[2]
                        }
                        oTicketArr[sPath].status = "Rejected"

                        this.TicketPopUp.rerender();
                        this.TicketPopUp.close();
                },
                OTicketClose: function ()// ticket fragment close function
                {
                        this.TicketPopUp.close();
                        this.TicketPopUp.destroy(true);


                },
                CarImagePicked: function (oEvent)//on selecting car event function
                {
                        debugger;
                        var f = oEvent.oSource.oFileUpload.files[0]
                        var image = URL.createObjectURL(f)
                        localStorage.setItem("carimg", image)
                },
                UploadCarImage: function ()//uploading image function
                {
                        var oTile = sap.ui.getCore().byId("GenericTilebackground")

                        this.CarImage = localStorage.getItem("carimg")
                        oTile.setBackgroundImage(this.CarImage)

                        sap.ui.getCore().byId('carImagefile').setValueState('None')

                },
                CarLogoPicked: function (oEvent)// on selecting logo function
                {
                        // debugger;
                        sap.ui.getCore().byId('carLogofile').setValueState('None')

                        var f = oEvent.oSource.oFileUpload.files[0]
                        var image = URL.createObjectURL(f)
                        localStorage.setItem("carlogo", image)

                },
                UploadCarLogo: function ()//uploading logo function
                {
                        var oTile = sap.ui.getCore().byId("GenericTilebackground2")

                        this.CarLogo = localStorage.getItem("carlogo")
                        oTile.setBackgroundImage(this.CarLogo)
                        // this.Mytilespopup.rerender()


                },
                AddCar: function () // adding car to the search model with validation
                {

                        var carBrandName = sap.ui.getCore().byId("carBrandName").getValue()
                        //     console.log(carBrandName);    
                        var carEngine = sap.ui.getCore().byId("carEngine").getValue()
                        // console.log(carEngine);    

                        var carModelName = sap.ui.getCore().byId("carModelName").getValue()
                        // console.log(carModelName);    

                        var carType = sap.ui.getCore().byId("carType").mProperties.value
                        // console.log(carType);
                        // debugger

                        var carMilage = sap.ui.getCore().byId("carMilage").getValue()
                        // console.log(carMilage);    

                        var carSeat = sap.ui.getCore().byId("carSeat").getValue()


                        var carFuel = sap.ui.getCore().byId("carFuel").mProperties.value
                        // console.log(carFuel);    

                        var carTransmission = sap.ui.getCore().byId("carTransmission").mProperties.value
                        // console.log(carTransmission);    

                        var carAirbags = sap.ui.getCore().byId("carAirbags").getValue()
                        // console.log(carAirbags);    

                        var carPrice = sap.ui.getCore().byId("carPrice").getValue()
                        // console.log(carPrice);    

                        var carQty = sap.ui.getCore().byId("carQty").getValue()
                        // console.log(carQty);    

                       
                        var oTilebackground = sap.ui.getCore().byId("GenericTilebackground").getBackgroundImage()
                        var oTilebackground2 = sap.ui.getCore().byId("GenericTilebackground2").getBackgroundImage()
                      
                        
                        
                        

                        if (carBrandName == "") {
                                sap.ui.getCore().byId('carBrandName').setValueState('Error')
                                sap.ui.getCore().byId('carBrandName').setValueStateText("Enter car brand name")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }
                        else if (carModelName == "") {
                                sap.ui.getCore().byId('carModelName').setValueState('Error')
                                sap.ui.getCore().byId('carModelName').setValueStateText("Enter car model name")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }
                        else if (carEngine == "") {
                                sap.ui.getCore().byId('carEngine').setValueState('Error')
                                sap.ui.getCore().byId('carEngine').setValueStateText("Enter engine cc in number")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }

                        else if (carType == "") {
                                sap.ui.getCore().byId('carType').setValueState('Error')
                                sap.ui.getCore().byId('carType').setValueStateText("Select type")
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }
                        else if (carMilage == "") {
                                sap.ui.getCore().byId('carMilage').setValueState('Error')
                                sap.ui.getCore().byId('carMilage').setValueStateText("Enter milage")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else if (carSeat == "") {
                                sap.ui.getCore().byId('carSeat').setValueState('Error')
                                sap.ui.getCore().byId('carSeat').setValueStateText("Enter number of car seats")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else if (carFuel == "") {
                                sap.ui.getCore().byId('carFuel').setValueState('Error')
                                sap.ui.getCore().byId('carFuel').setValueStateText("Select fuel type")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }
                        else if (carTransmission == "") {
                                sap.ui.getCore().byId('carTransmission').setValueState('Error')
                                sap.ui.getCore().byId('carTransmission').setValueStateText("select transmission type")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else if (carAirbags == "") {
                                sap.ui.getCore().byId('carAirbags').setValueState('Error')
                                sap.ui.getCore().byId('carAirbags').setValueStateText("Enter car Airbags in number")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else if (carPrice == "") {
                                sap.ui.getCore().byId('carPrice').setValueState('Error')
                                sap.ui.getCore().byId('carPrice').setValueStateText("Enter car price ")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else if (carQty == "") {
                                sap.ui.getCore().byId('carQty').setValueState('Error')
                                sap.ui.getCore().byId('carQty').setValueStateText("Enter how many Quantities ")
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')

                        }
                        else if (oTilebackground == '') {
                                sap.ui.getCore().byId('carImagefile').setValueState('Error')
                                sap.ui.getCore().byId('carImagefile').setValueStateText("select image and click upload button")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carLogofile').setValueState('None')


                        }
                        else if (oTilebackground2 == '') {

                                sap.ui.getCore().byId('carLogofile').setValueState('Error')
                                sap.ui.getCore().byId('carLogofile').setValueStateText("select logo and click upload button")
                                sap.ui.getCore().byId('carType').setValueState('None')
                                sap.ui.getCore().byId('carFuel').setValueState('None')
                                sap.ui.getCore().byId('carTransmission').setValueState('None')
                                sap.ui.getCore().byId('carImagefile').setValueState('None')


                        }
                        else {

                        var oCarData = {}
                        oCarData.Carid =carBrandName[0]+carBrandName[1]+carBrandName[2]
                        oCarData.Title = carModelName
                        oCarData.Brandname = carBrandName
                        oCarData.Cartype = carType
                        oCarData.Price = carPrice
                        oCarData.Engine = carEngine
                        oCarData.Seatingcapacity = carSeat
                        oCarData.Milage = carMilage
                        oCarData.Transmission = carTransmission
                        oCarData.Fueltype = carFuel
                        oCarData.Airbags = carAirbags
                        oCarData.Quantity = carQty

                      

                        this.getView().getModel().create("/ZCarDetailsSet",oCarData,{
                                method:"POST",    
                                success:function (data){
                                    debugger
                                    MessageToast.show("Car Added Successfully");
                                    var mloation  = location
                                          mloation.reload()
                                },
                                error: function (data){
                                    MessageToast.show('Failed to Add Car');
                                },
                                });


                        this.AdminAddFragment.close()
                        this.AdminAddFragment.destroy(true)


                        }



                },
                mUpdateOData: function (){

                        debugger
                        var carId = sap.ui.getCore().byId("uId").getText();
                        //     console.log(carBrandName);  

                        var carBrandName = sap.ui.getCore().byId("uTitle").getText();
                        //     console.log(carBrandName);    
                        var carEngine = sap.ui.getCore().byId("uEngine").getText();
                        // console.log(carEngine);    


                        var carType = sap.ui.getCore().byId("uType").getText();
                        // console.log(carType);
                        // debugger

                        var carMilage = sap.ui.getCore().byId("uMileage").getValue()
                        // console.log(carMilage);    


                        var carFuel = sap.ui.getCore().byId("uFuel").getValue()
                        // console.log(carFuel);    

                        var carTransmission = sap.ui.getCore().byId("uTransmission").getValue()
                        // console.log(carTransmission);    

                        var carAirbags = sap.ui.getCore().byId("uAirbags").getValue()
                        // console.log(carAirbags);    

                        var carPrice = sap.ui.getCore().byId("uPrice").getValue()
                        // console.log(carPrice);    

                        var carQty = sap.ui.getCore().byId("uQty").getValue()

                        var carSeat = sap.ui.getCore().byId("uSeat").getValue()
                     
                        var carName = sap.ui.getCore().byId("carName").getText()
                        
                        var carCimage = this.getView().getModel().oData.Cimage

                        var carLogo = this.getView().getModel().oData.Logo
                        debugger
                        var oCarData = {}
                        oCarData.Carid = carId
                        oCarData.Title = carBrandName
                        oCarData.Brandname = carName
                        oCarData.Cartype = carType
                        oCarData.Price = carPrice
                        oCarData.Engine = carEngine
                        oCarData.Seatingcapacity = carSeat
                        oCarData.Milage = carMilage
                        oCarData.Transmission = carTransmission                       
                        oCarData.Fueltype = carFuel
                        oCarData.Airbags = carAirbags
                        oCarData.Quantity = carQty
                       
                        
                        this.getOwnerComponent().getModel().update("/ZCarDetailsSet('" + carId+ "')"
                        ,oCarData,{
                                method:"PATCH",
                                success:function(data){
                                        MessageToast.show("Updated Successfully ");
                                        var mloation  = location
                                        mloation.reload()
                                },
                                error:function(){
                                        MessageToast.show("Updation Failed");
                                }
                              })
                        

                        this.cardetailpopup.close()
                        this.cardetailpopup.destroy(true)
                        
                                
                },
                mDeleteOData: function () {
                        debugger
                        var carId = sap.ui.getCore().byId("uId").getText()
                        this.getOwnerComponent().getModel().
                        remove("/ZCarDetailsSet('" + carId + "')", {
                        method: "DELETE",
                        success: function (data) {
                        MessageToast.show("Customer deleted Successfully with number  " + carId);
                        var mylocation = location; mylocation.reload();
                        },
                        error: function (e) {
                        MessageToast.show("Customer deletion Failed  " + carId);
                        }
                        });
                        },
            
                // this is for live validating to the adding new car input fields 
                carBrandName: function () {
                        sap.ui.getCore().byId("carBrandName").setValueState("None")
                },
                carModelName: function () {
                        sap.ui.getCore().byId("carModelName").setValueState("None")

                },
                carEngine: function () {
                        sap.ui.getCore().byId("carEngine").setValueState("None")

                },
                carMilage: function () {
                        sap.ui.getCore().byId("carMilage").setValueState("None")

                },
                carSeat: function () {
                        sap.ui.getCore().byId("carSeat").setValueState("None")

                },
                carQty: function () {
                        sap.ui.getCore().byId("carQty").setValueState("None")

                },
                carPrice: function () {
                        sap.ui.getCore().byId("carPrice").setValueState("None")

                },
                carAirbags: function () {
                        sap.ui.getCore().byId("carAirbags").setValueState("None")

                },
                onDeleteMultiple1:function(oEvent){
     
                        var oList = this.getView().byId('batchList');
                        var selectItem = oList.getSelectedItems();
                        var oModel = this.getView().getModel('cardata');
                         var object = [];
                         for (var i = 0; i < selectItem.length; i++) {
                                for (var i = 0; i < selectItem.length; i++) {
                                        var selectedrow = {
                                            "Carid": selectItem[i].getBindingContext('cardata').getObject().Carid,
                                            "Brandname": selectItem[i].getBindingContext('cardata').getObject().Brandname,
                                            "Title": selectItem[i].getBindingContext('cardata').getObject().Title,
                                            "Engine": selectItem[i].getBindingContext('cardata').getObject().Engine,
                                            "Cartype": selectItem[i].getBindingContext('cardata').getObject().Cartype,
                                            "Milage": selectItem[i].getBindingContext('cardata').getObject().Milage,
                                            "Seatingcapacity": selectItem[i].getBindingContext('cardata').getObject().Seatingcapacity,
                                            "Fueltype": selectItem[i].getBindingContext('cardata').getObject().Fueltype,
                                            "Transmission": selectItem[i].getBindingContext('cardata').getObject().Transmission,
                                            "Airbags": selectItem[i].getBindingContext('cardata').getObject().Airbags,
                                            "Price": selectItem[i].getBindingContext('cardata').getObject().Price,
                                            "Quantity": selectItem[i].getBindingContext('cardata').getObject().Quantity,
                                        };             
                                        object.push(selectedrow);
                                    }

         var oModel = this.getView().getModel();
     

         oModel.setUseBatch(true);
       var jModel = this.getOwnerComponent().getModel();
     for(var i = 0; i<object.length; i++){
         var oEntry = object[i].Carid;
         oModel.remove("/ZCarDetailsSet('" + oEntry + "')",
         { 
             method:"DELETE",
         success:function(response){
             debugger
             sap.m.MessageToast.show("Car Data is deleted");
         }
         }
         );  
     }

     oModel.submitChanges({
         success: function(data, response){
                
         },
         error: function(e){

         }
     })
     this.onAfterRendering();
     
}
                },
                onSuggest:function(oEvent){
                        var valSuggest = oEvent.getParameter('suggestValue')
                        oEvent.getSource().suggest()
                },
                onSearch:function(oEvent){
                        debugger
                        var searchStr = oEvent.getParameter("query")
                        var oModel = this.getView().getModel('cardata');
                        var oContext = this;
                        var oDataModel = this.getOwnerComponent().getModel();
                        var arr = new Array();
                        oDataModel.callFunction(
                            "/SelectByCarTitle", {
                            method:"GET",
                            urlParameters:{
                                Title: searchStr
                            },
                            success:function(oData,response){
                                debugger
                            arr = oData.results;
                            oModel.setData(arr)
                            oContext.getView().setModel(oModel);
            
                            },
                            error:function(oError)
                            {
                                
                            }
                
                            }
                            
                            );
            
                }



        });
});