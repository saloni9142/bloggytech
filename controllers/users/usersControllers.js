//@ description register new user
//@route Post/api/v1/users/register
//@ access public

exports.register=async(req,resp)=>{
    resp.json({message:"user registration controller executed"});

};