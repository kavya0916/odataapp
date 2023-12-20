sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("ui5application.controller.Consumer", {

        
         cardetailpopup:null,
         TotalAmount:null,
         oOldItemData:[],
         itemsPath:[],
         newArray:[],
         invcPopup:null,
        onInit: function() {
           this.getOwnerComponent().getRouter().getRoute('ConsumerPage').attachPatternMatched(this.RouteMatch,this)
            this.getView().byId('ConsumerProductItemBind').bindElement("carsData>/cardata/0/Cars")
            // initial car data shown to the customer, in products tab
                   
        
        },
        RouteMatch:function(oEvent){
            var Userid =oEvent.getParameter('arguments').id
            // var mail=userEmail.split('@')
            // var userId=mail[0]+'%40'+mail[1]
            var that=this;
            debugger
            var userDetail=JSON.parse(localStorage.getItem(
                "currUser"
                ))?JSON.parse(localStorage.getItem(
                "currUser"
                )):{}

            var oModel=this.getView().getModel('userdata')   
            oModel.setData(userDetail);
            this.getView().setModel(oModel)     
        },
      

        onAfterRendering:function(userId){
         
            var that=this
            var oDataModel=this.getView().getModel().read('/ZCarDetailsSet',{
                method:"GET",
            success:function(oData,response){
              // console.log(oData.results);
            //   debugger
              var oContext=that
                // var carTypes=[]
                var carTypes=oData.results
                that.getView().getModel("search").oData.Cars
                var CarArr0 = []
                var CarArr1 = []
                var CarArr2 = []

                carTypes.forEach((ele,ind)=>{
                    var oModel2 = oContext.getView().getModel('carsData')
                    console.log(ele);

                    var carType=ele.Cartype
                    
                     CarArr0 = oModel2.oData.cardata[0].Cars
                     CarArr1 = oModel2.oData.cardata[1].Cars
                     CarArr2 = oModel2.oData.cardata[2].Cars                        
                 
                     for(var i=0;i<=oModel2.oData.cardata.length-1;i++)
                     {
                        // debugger
                             if(carType == 'Sedan')
                             {  
                                debugger
                                     CarArr0.push({

                                             "name":ele.BrandName,
                                             "title":ele.Title,
                                             "Engine":ele.Engine+" "+"cc",
                                             "Fuel":ele.Fueltype,
                                             "type":ele.Cartype,
                                             "Transmission":ele.Transmission,
                                             "Mileage":ele.Milage,
                                             "seat":ele.seatingcapacity,
                                             "AirBags":ele.Airbags+" "+"AirBags",
                                             "price":ele.Price,
                                             "qty":ele.Quantity

                                     })

                                     var oModelData2 = new sap.ui.model.json.JSONModel({Cars:CarArr0});
                                     oModel2.setData(CarArr0,"Cars")
                     
                                     oContext.getView().setModel(oModelData2);
                             }


                             if(carType == 'SUV')
                             {
                                debugger
                                     CarArr1.push({

                                        "name":ele.BrandName,
                                        "title":ele.Title,
                                        "Engine":ele.Engine+" "+"cc",
                                        "Fuel":ele.Fueltype,
                                        "type":ele.Cartype,
                                        "Transmission":ele.Transmission,
                                        "Mileage":ele.Milage,
                                        "seat":ele.seatingcapacity,
                                        "AirBags":ele.Airbags+" "+"AirBags",
                                        "price":ele.Price,
                                        "qty":ele.Quantity
                                            
                                     })

                                     
                                     var oModelData2 = new sap.ui.model.json.JSONModel({Cars:CarArr1});
                                     oModel2.setData(CarArr1,"Cars")
                     
                                     oContext.getView().setModel(oModelData2);
                             }

                             if(carType == 'Sports')
                             {
                                debugger
                                     CarArr2.push({

                                        "name":ele.BrandName,
                                        "title":ele.Title,
                                        "Engine":ele.Engine+" "+"cc",
                                        "Fuel":ele.Fueltype,
                                        "type":ele.Cartype,
                                        "Transmission":ele.Transmission,
                                        "Mileage":ele.Milage,
                                        "seat":ele.seatingcapacity,
                                        "AirBags":ele.Airbags+" "+"AirBags",
                                        "price":ele.Price,
                                        "qty":ele.Quantity
                                            
                                     })

                                     
                                     var oModelData2 = new sap.ui.model.json.JSONModel({Cars:CarArr2});
                                     oModel2.setData(CarArr2,"Cars")
                     
                                     oContext.getView().setModel(oModelData2);
                             }
                     }

                     oContext.dataArr.push({
                            "name":ele.BrandName,
                            "title":ele.Title,
                            "Engine":ele.Engine+" "+"cc",
                            "Fuel":ele.Fueltype,
                            "type":ele.Cartype,
                            "Transmission":ele.Transmission,
                            "Mileage":ele.Milage,
                            "seat":ele.seatingcapacity,
                            "AirBags":ele.Airbags+" "+"AirBags",
                            "price":ele.Price,
                            "qty":ele.Quantity
                                
                                })
                     
                     var oModelData = new sap.ui.model.json.JSONModel({Cars:oContext.dataArr});
                     oModel.setData(oContext.dataArr,"Cars")

                     oContext.getView().setModel(oModelData);
       
                })
            },
            error:function(){
                MessageToast.show('Failed to Read Model')
            }
            })

            debugger
                var oModel = this.getView().getModel("search")
                this.dataArr = oModel.oData.Cars   

                var oDataModel=this.getView().getModel().read('/ZTicketsSet',{
                    method:"GET",
                success:function(oData,response){
                    var tickets=[]
                    tickets=oData.results
                    var myArr=[]
                    tickets.forEach((ele, ind)=>{
                        debugger
                        
                    })
                    var tModel=that.getView().getModel('ticket')
                    tModel.setData({newTickets:myArr})
                },
                error:function(){
                    MessageToast.show('Failed to Read Model')
                }
                })
    
                     
                     

                },
        oSelectedAcceries:function(oEvent)
        {
            debugger
            
            var Key = 0
            var length = oEvent.getParameters().selectedItems.length
            for(var i=0;i<=length-1;i++)
            {
               Key = Key+parseInt(oEvent.getParameters().selectedItems[i].mProperties.key)
            
            }
            this.getView().byId("TotalAmount").setText(Key+parseInt(localStorage.getItem("TotalAmount")))
        },
        
        TabSelected:function(oEvent)//tab selection in consumer page 
        {
            var sKey = oEvent.getSource().getSelectedKey()
            debugger
            if(sKey=="Products")
            {
                this.getView().byId('AddtoBillButton').setVisible(true)
            
                this.getView().byId('BillGenerate').setVisible(false) 


            }
            if(sKey=="Bill")
            {
                this.getView().byId('AddtoBillButton').setVisible(false)
                // this.getView().byId('invoice').setVisible(true) 
                this.getView().byId('BillGenerate').setVisible(true)
                
                

            }
            if(sKey=="Ticket")
            {
                this.getView().byId('AddtoBillButton').setVisible(false)
                // this.getView().byId('invoice').setVisible(false)  
                this.getView().byId('BillGenerate').setVisible(false) 


            }
            if(sKey=="UserPanel")
            {
                this.getView().byId('AddtoBillButton').setVisible(false)
                // this.getView().byId('invoice').setVisible(false) \
                this.getView().byId('BillGenerate').setVisible(false) 


            }
            
        },
        ConsumerLogout:function() // consume logout button
        {
            var oRouter = this.getOwnerComponent().getRouter()
                oRouter.navTo("RouteHome")
                localStorage.removeItem("UserID")
        },
        

        oCategorySelect:function(oEvent)
        {   
            // debugger
            var sPath = oEvent.getParameter("listItem").getBindingContextPath()

            this.getView().byId('ConsumerProductItemBind').bindElement("carsData>"+sPath+"/Cars")
        },
        oBillItems:function()
        {
        debugger
            this.newArray

            if(this.itemsPath.length==0)
            {
                sap.m.MessageToast.show("Please Select Items.!!!")
                
            }
            else{

            
                var billArray = new Array()
                var billModel = this.getView().getModel("billdata")
                
                
            for(var i=0;i<=this.itemsPath.length-1;i++)
            {
                var sPath = this.itemsPath[i]
               var p1 = sPath.split("/")[2]
                var p3 = sPath.split("/")[4]
               
                var oModel = this.getView().getModel("carsData")
                var myArr = oModel.oData.cardata[p1].Cars[p3]
            
                var oNewModel = this.getView().getModel("state") //pushing all paid items to state model
                    
                    this.newArray.push({
                        "title":myArr.title,
                        "price":myArr.price,
                        "image":myArr.image,
                        "type":myArr.type,
                        "Sales":1
                        
                    })
                oNewModel.setData(this.newArray)
                this.getView().setModel(oNewModel)

// ***************billed model*****************
                billArray.push({
                    "title":myArr.title,
                        "price":myArr.price,
                        "image":myArr.image,
                        "type":myArr.type,
                        "Sales":1
                })
                billModel.setData(billArray)
                this.getView().setModel(billModel)
                var a=0
                a= myArr.price
                var amt=parseInt(a)
                this.TotalAmount = this.TotalAmount +amt
                this.getView().byId("TotalAmount").setText(this.TotalAmount)
                localStorage.setItem("TotalAmount",this.TotalAmount)
            }
            sap.m.MessageToast.show("Added Successfully")
                
        }
        
        },
        oSelectedItems:function(oEvent)
        {
            debugger
            //on selecting multiple cars and storing the selected paths in global variable 
            this.itemsPath = oEvent.oSource._aSelectedPaths
        },
        oCarClose:function()
        {
                this.cardetailpopup.close();

        },
        AddAccessris:function()
        {
            // adding Accessris and Calculating the total bill at Bill tab in customer page
            debugger
            
            if(this.TotalAmount == '')
            {
                sap.m.MessageToast.show("No Data.! To Add ACCESSORIES.!")
            }
            else {
                    var oSelected = this.getView().byId('AccItemsData').getSelectedItems()
                    debugger
                    // this.TotalAmount = this.getView().byId('ItemToBill').getNumber()
                    // var ProductAmount = parseInt(this.TotalAmount)
                    // this.getView().byId('TotalAmount').setText(ProductAmount)

                 
                        
                        var NewAmount=0
                    
                    for(var i=0;i<=oSelected.length-1;i++)
                    {
                        NewAmount = oSelected[i].mProperties.number
                    
                        NewAmount= parseInt(NewAmount)
                        
                        this.TotalAmount = (NewAmount+this.TotalAmount)

                    }
                    this.getView().byId('TotalAmount').setText(ProductAmount+this.TotalAmount)
                    

                    sap.m.MessageToast.show('Accessories Added')
            }
        },
        OPayment:function()// payment function***************
        {

            debugger
            var price = this.getView().byId('TotalAmount').getText()
           
                if(price == '')
                {
                    sap.m.MessageToast.show("No Data !")
                }
                else {
                                                             

                    // **** for user purchased data table( in consumer first tab)*****

                    var UserID = localStorage.getItem("UserID")
                    var Purchased_records = new Array()
                    var allPurchasedata = this.getView().getModel("allPurchasedata")
                   
                    var carsPurchased = this.getView().getModel("state").oData

                    for(var i=0;i<=carsPurchased.length-1;i++)
                    {
                        Purchased_records.push({
                            "UserID":UserID,
                            "title":carsPurchased[i].title,
                            "image":carsPurchased[i].image,
                            "price":carsPurchased[i].price,
                            

                        })
                    }
                   
                    allPurchasedata.setData(Purchased_records)

                    this.getView().setModel(allPurchasedata)

                    // **** matching based on user id and purchased data will be set into the Customer table in (Consumer first tab) 
                    var purchased = this.getView().getModel("puchaseddata")
                    var arr = new Array()
                        
                        for(var i=0;i<=Purchased_records.length-1;i++)
                        {
                            if(UserID==Purchased_records[i].UserID)
                            {
                                arr.push({
                                    "title":Purchased_records[i].title,
                                    "image":Purchased_records[i].image,
                                    "type":Purchased_records[i].type,
                                    "price":Purchased_records[i].price

                                })
                                
                            }
                        }
                        purchased.setData(arr)
                        this.getView().setModel(purchased)
                    


                    sap.m.MessageToast.show("Payment Successful")

                    // *********** Pie chart ***********

             

                var newPieArr = new Array()
                        newPieArr = this.newArray
                var oSearchModel = this.getView().getModel("pie")
                var soldPieArr = new Array()
                        
              
                var oSearchModel2 = this.getView().getModel("carsData")
                var pieArr = new Array()

                var iPath = this.itemsPath
                    
                    // **** increasing quantity and seting the pie chart
                    var saleItem=0
                    for(var i=0;i<=this.itemsPath.length-1;i++)
                    {   
                        
                        iPath = this.itemsPath[i]
                        var p1 = iPath.split("/")[2]
                        var p3 = iPath.split("/")[4]
                        pieArr = oSearchModel2.oData.cardata[p1].Cars[p3]
                       
                        if(newPieArr[i].title == pieArr.title)
                        {
                            saleItem = newPieArr[i].Sales;
                            saleItem=saleItem+1;
                        }
                        soldPieArr.push({
                            "title":pieArr.title,
                            "price":newPieArr[i].price,
                            "image":newPieArr[i].image,
                            "Sales":saleItem,
                            "type":pieArr.type
                        })
                    }
                    oSearchModel.setData(soldPieArr)
                    this.getView().setModel(oSearchModel)
                   
        // **************** Quantity Reducing when customer purchased the car *************** */

                    var rModel = this.getView().getModel("carsData")
                    var oModel1 = this.getView().getModel("search")

                        var len = oModel1.oData 
                    var rNewArr = new Array()
                    var title=""
                    var num=0;
                    
                for(var i=0;i<=this.itemsPath.length-1;i++)
                {
                    var sPath = this.itemsPath[i]
                    var p1 = sPath.split("/")[2]
                    var p3 = sPath.split("/")[4]
                    rNewArr = rModel.oData.cardata[p1].Cars[p3]

                    title=rNewArr.title

                    this.oOldItemData = oModel1.oData.Cars//search model data
                   
                   for(var j=0;j<=this.oOldItemData.length-1;j++)
                   {
                    if(this.oOldItemData[j].title==title)
                    {
                        num= this.oOldItemData[j].qty
                        num=num-1;
                        this.oOldItemData[j].qty=num
                    }
                   }
                    oModel1.setData(this.oOldItemData,"Cars")
                    this.getView().setModel(oModel1)

                
                }

                // ****to empty the billing table****
                this.getView().byId('TotalAmount').setText("")
                this.TotalAmount=0
              var mm =  this.getView().getModel("billdata")
              var temp= mm.oData
                temp=[]
              mm.setData(temp)
              this.getView().setModel(mm)
                
               
            }
           


        },


        onSuggest:function(oEvent){

            var valSuggest = oEvent.getParameter('suggestValue')
            oEvent.getSource().suggest()
        },
        onSearch:function(oEvent)//for search and suggestion items
        {
            var searchStr = oEvent.getParameter("query")
            var oFilter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, searchStr);

            var aFilter = [oFilter];
            var oList = this.getView().byId('allCars');

            oList.getBinding('items').filter(aFilter)
        },
        onSearchSelectItem:function(oEvent)
        {
            this.getView().byId('oTicketSendButton').setVisible(true)

            this.getView().byId('ItemdetailData').setVisible(true)
          var ListItem = oEvent.getParameter("listItem")
         

           var sPath = ListItem.getBindingContextPath()

           var oDetail = this.getView().byId('ItemdetailData')
           oDetail.bindElement("search>"+sPath)

        },

         OTicketReq:function()// ticket Request function
        {
            var ProductCategory = this.getView().byId('ProductCategory').mProperties.value
            var ProductName = this.getView().byId('ProductName').mProperties.value
            var ProductModel = this.getView().byId('ProductModel').mProperties.value
            var ProductQty = this.getView().byId('ProductQty').getValue()

            if(ProductCategory=='')
            {
                this.getView().byId('ProductCategory').setValueState('Error')
                this.getView().byId('ProductCategory').setValueStateText('Select Product-Category')

                this.getView().byId('ProductName').setValueState('None')
                this.getView().byId('ProductModel').setValueState('None')
                this.getView().byId('ProductQty').setValueState('None')


            }
            else if(ProductName=='')
            {
                this.getView().byId('ProductName').setValueState('Error')
                this.getView().byId('ProductName').setValueStateText('Select Product-Name')

                this.getView().byId('ProductCategory').setValueState('None')
                this.getView().byId('ProductModel').setValueState('None')
                this.getView().byId('ProductQty').setValueState('None')


            }
            else if(ProductModel=='')
            {
                this.getView().byId('ProductModel').setValueState('Error')
                this.getView().byId('ProductModel').setValueStateText('Select Product-Model')
                
                this.getView().byId('ProductCategory').setValueState('None')
                this.getView().byId('ProductName').setValueState('None')
                this.getView().byId('ProductQty').setValueState('None')



            }
            else if(ProductQty=='')
            {
                this.getView().byId('ProductQty').setValueState('Error')
                this.getView().byId('ProductQty').setValueStateText('Enter Quantity')
                
                this.getView().byId('ProductCategory').setValueState('None')
                this.getView().byId('ProductName').setValueState('None')
                this.getView().byId('ProductModel').setValueState('None')



            }
            else {

                this.getView().byId('ProductCategory').setValueState('None')
                this.getView().byId('ProductName').setValueState('None')
                this.getView().byId('ProductModel').setValueState('None')
                this.getView().byId('ProductQty').setValueState('None')

                    var tickets = new Array()
                    debugger    
                    var oTicket = this.getView().getModel("ticket")
                        tickets = oTicket.oData.newTickets

                    tickets.push({
                        "pcat":ProductCategory,
                        "pname":ProductName,
                        "pmodel":ProductModel,
                        "pQty":ProductQty,
                        "status":"Pending"
                    })

                    oTicket.setData(tickets,"newTickets")
                    this.getView().setModel(oTicket)


                    sap.m.MessageToast.show("Ticket Sent.")
            }     
        },
        
    
	});
}); 
