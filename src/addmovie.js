import React from "react"; //step 1 
import 'bootstrap/dist/css/bootstrap.min.css';
class AddMovie extends React.Component   //step 2
{
    constructor(props){
        super(props);
   //to initialise variables and methods
   this.state={
    id:'',
    mname:'',
    mtype:'',
    mdesc:'',
    movielist:[],
    isUpdate:false,  //to check whether to update or insert
    isValidate:true, //to check whether form is valid or not
    message:''
   }
   this.getMovieName=this.getMovieName.bind(this);
   this.getMovieType=this.getMovieType.bind(this);
   this.getMovieDesc=this.getMovieDesc.bind(this);
   this.saveMovie=this.saveMovie.bind(this);
   this.getAll=this.getAll.bind(this);
   this.editMovie=this.editMovie.bind(this);
   this.updateMovie=this.updateMovie.bind(this);
   this.deleteMovie=this.deleteMovie.bind(this);
   this.resetForm=this.resetForm.bind(this);
   console.log('constructor');
    }
 
    getMovieName(e){
      this.setState({mname:e.target.value});
 
    }
    getMovieType(e){
        this.setState({mtype:e.target.value});
    }
    getMovieDesc(e){
        this.setState({mdesc:e.target.value});
    }
    getAll(){
        fetch('http://localhost:8000/movie/getAll')
        .then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({movielist:result});
        }).catch((err)=>{
            console.log(err);
        })
    }
    saveMovie(){
        //to validate form
        if(this.state.mname===''||this.state.mtype===''||this.state.mdesc===''){
            this.setState({
                isValidate:false,
                message:'Please fill all the fields'
            });
            return;
        }
        var movie={
            "name":this.state.mname,
            "type":this.state.mtype,
            "desc":this.state.mdesc,
        }
        this.setState({movielist:this.state.movielist.concat(movie)});
        // console.log(this.state.movielist);
        //connect API call to save movie using fetch API
       
        fetch('http://localhost:8000/movie/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(movie)
        }).then((response)=>{
            return response.json();
        }).then((result)=>{
            if(result.message==='Inserted')
            {
                this.setState({
                    isValidate:true,
                    message:"Movie saved successfully"
                });
                this.resetForm(); //to refresh form
                this.getAll(); //to refresh movie list
            }
                else
               alert('error occured while saving movie');
        }).catch((err)=>{
            console.log(err);
        });
    }
    updateMovie(){
        var movie={
            "_id":this.state.id,
            "name":this.state.mname,
            "type":this.state.mtype,
            "desc":this.state.mdesc,
        }
        //connect API call to update movie using fetch API
        fetch('http://localhost:8000/movie/update/'+this.state.id,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(movie)
        }).then((response)=>{
            return response.json();
        }).then((result)=>{
            if(result.message==='Update')
            {
                this.resetForm(); //
                this.getAll(); //to refresh movie list
   }   else
               alert('error occured while saving movie');
        }).catch((err)=>{
            console.log(err);
        });
    }
    deleteMovie(){
        //connect api call to delete movie using setch api
    }
    deleteConfirm(id){
        this.setState({
            id:id
        });
    }
    editMovie(id){
        //to edit movie
        fetch('http://localhost:8000/movie/get/'+id)
        .then((response)=>{return response.json();
        }).then((result)=>{return result.json()})
        .then(result=>{
            this.setState({
                id:result[0]._id,
                mname:result[0].name,
                mtype:result[0].type,
                mdesc:result[0].desc,
                isUpdate:true
            });
        
        })
        .catch((err)=>{
            console.log(err);
        })
    }
   
    resetForm(){
        this.setState({
            mname:'',mtype:'',mdesc:'',isUpdate:false
        });
    }
    render(){
        return(
            <div>
                <hr />
                <h2>Add Movie-{this.props.title}</h2>
                <hr />
                <form>
                    Movie Name:<input type="text" className="form-control" value={this.state.mname} onChange={this.getMovieName}/><br/>
                    Movie Type:<input type="text" className="form-control" value={this.state.mtype} onChange={this.getMovieType}/><br/>
                    Movie Desc:<input type="text" className="form-control" value={this.state.mdesc} onChange={this.getMovieDesc}/><br/>
                    {(this.state.isUpdate) ?
                    <input type='button' value='Update' onClick={this.updateMovie} className='btn btn-primary'/>
                     :
                  <input type='button' value='Save' onClick={this.saveMovie} className='btn btn-primary'/>
                  }
                  <input type='button' value="Reset" onClick={this.resetForm} className='btn btn-secondary'></input>
                </form>
                {(this.state.message!=='')} 
                <div>
                    {(this.state.isValidate) ?
                      <div className='alert alert-success'>{this.state.message}</div>  
                      :
                      <div className='alert alert-danger'>{this.state.message}</div>  
                }
                </div>
                {/* <h4>{this.state.mname}</h4>
                <h4>{this.state.mtype}</h4>
                <h4>{this.state.mdesc}</h4> */}
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Desc</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movielist.map((item)=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.desc}</td>
                                <td><button className='btn btn-primary' data-dismiss="modal" onClick={()=>this.editMovie(item._id)}>Edit</button></td>
                                <td><button className='btn btn-danger' data-target="#confirmModal" data-toggle="modal" onClick={()=>this.deleteConfirm(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
     <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
     <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this movie?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal"  >Yes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        );
    }
    componentDidMount(){
        //console.log('component did mount');
       this.getAll();
       
   //to load default data after render
    }
}

export default AddMovie;