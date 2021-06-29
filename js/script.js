document.querySelector(".button-container")
.addEventListener("click",()=>{
    let text=document.getElementById("filter-jobs").value;
    getjobs().then(jobs=>{
        let filteredjobs=filterjobs(jobs,text);
        showjobs(filteredjobs);
    })
})
 
function getjobs(){
    return fetch("data.json")
    .then(response=>response.json())
    .then(data=>{
        return data
    })
} 
function filterjobs(jobs,searchtext){
    if(searchtext){
        let filterjobs=jobs.filter(job=>{
            if(job.roleName.toLowerCase().includes(searchtext)
            ||job.type.toLowerCase().includes(searchtext)
            ||job.company.toLowerCase().includes(searchtext)
            ||job.requirements.content.toLowerCase().includes(searchtext)){
                return true
            }else{
                return false;
            }
        })
        return filterjobs;
        }else {
            return jobs
        }
    }





function showjobs(jobs){
   
    let jobscontainer=document.querySelector(".jobs-container");
    let jobsHtml="";
    jobs.forEach(job => {
        jobsHtml += `
        <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}"/><span> <i class="fas fa-ellipsis-h"></i></span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}"</span>
                </div>
                <div class="description">
                    <span> ${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>`
        
    });
    jobscontainer.innerHTML=jobsHtml;
}

getjobs().then(data=>{
    showjobs(data)
});