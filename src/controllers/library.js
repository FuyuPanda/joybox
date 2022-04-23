const axios=require('axios');

exports.getBooksBySubject=async(req,res)=>{
    try{
        const{subject}=req.params;
        const fetch=await getData(subject)
        if(fetch.length>0)
        {     
             let data=new Array();
             for(var i=0;i<fetch.length;i++)
             {
                 const model={
                     title:fetch[i].title,
                     subject:fetch[i].subject,
                     authors:fetch[i].authors,
                     edition:fetch[i].cover_edition_key
                 };
                 data.push(model);
             }
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Ok",
                data
            });

        }
    }
    catch(e)
    {
        return res.status(500).send({
            status:"Error",
            code:500,
            message:err.message
        });
    }
}

exports.BorrowNewBooks=async(req,res)=>{
    const {body}=req;
    let data=new Array();
    const fetch=await getData(body.subject);
    if(fetch.length>0)
    {
        let result=new Array();
        for(var i=0;i<fetch.length;i++)
        {
            const items={
                title:fetch[i].title,
                subject:fetch[i].subject,
                authors:fetch[i].authors,
                edition:fetch[i].cover_edition_key
                 };
            result.push(items);
        }

        let books=new Array();
        const model={
            customer_name:body.customer_name,
            dob:body.dob,
            address:body.address,
            subject:body.subject,
            books
        };

        for(var i=0;i<body.titles.length;i++)
        {
            const book=result.filter(function(e){
                return e.title==body.titles[i]});
            
            if(book.length>0)
            {
                for(var j=0;j<book.length;j++)
                {
                    model.books.push(book[j]);    
                }
                            
            }

        }

        data.push(model);
        

    }

    if(data.length>0)
    {
        return res.status(200).send({
            status:"Success",
            code:200,
            message:"You have successfully borrow new books",
            data
        });
    }
    else{
        return res.status(400).send({
            status:"Failed",
            code:400,
            message:"Failed to borrow new books",
            data
        })
    }
}


const getData=async (subject)=>{
    var options = {
        'method': 'GET',
        'url': 'http://openlibrary.org/subjects/'+subject+'.json'
      };
    const result=await axios(options);
    return result.data.works;
}