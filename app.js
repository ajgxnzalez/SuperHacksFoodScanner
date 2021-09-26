// LogMeal API


let data = new FormData();


const fileSelector = document.getElementById('imageFile');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList[0]);
    var formdata = new FormData();
    const uploadImage = fileList[0]
    formdata.append("image", uploadImage);
    var requestOptions = {
        method: 'POST',
        headers: {"Authorization": "Bearer 361fdf262bd5433373ac2f31d94a68ab76f66c10"},
        body: formdata,
        redirect: 'follow'
      };
    let res = document.querySelector('#res');
    let sImg = document.querySelector('#searchImg');
    sImg.src = uploadImage;
    res.innerHTML = 'loading...';
      fetch("https://api.logmeal.es/v2/recognition/dish", requestOptions)
        .then(response =>response.json())
        .then(ans => {
            
            console.log(ans.recognition_results[0])
            let res = document.querySelector('#res');
            if(ans.recognition_results[0]['prob'] > 0.5){
                res.innerHTML = ans.recognition_results[0]['name'];
            } else {
                res.innerHTML = 'This photo did not match our database. Please upload a different photo.';
            }
            
            
        
        })
        
        .catch(error => console.log('error', error));
    event.target.values = ''
  });


