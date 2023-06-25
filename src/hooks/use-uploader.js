import { toastError } from "../utils";
import uniqid from 'uniqid';

const useUploader = ({
  type,
  files, 
  setFiles, 
}) => {
  let acceptedFileTypes = '';

  if (type === 'images') {
    acceptedFileTypes = 'image/jpg, image/jpeg, image/png';
  } else if (type === 'documents') {
    acceptedFileTypes = 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf';
  }

  const handleUpload = (e) => {
    const targetedFiles = Array.from(e.target.files);

    const readAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = () => {
          const base64 = fr.result;
          const ext = file.name.split('.').pop();
          const size = file.size;
          const type = file.type;

          const ACCEPT_TYPE_MAPPER = acceptedFileTypes.split(/[ ,]+/);
          
          if (!ACCEPT_TYPE_MAPPER.includes(type)) {
            reject('Upload failed, the uploader accepts images only.');
          }

          if (size > 15000000) {
            reject('Upload failed, the uploader accepts 15mb only.');
          }
    
          resolve({
            fileName: `${uniqid()}-${file.name}`,
            base64,
            ext,
            size,
            type,
          });
        }
        fr.readAsDataURL(file);
      })
    };

    Promise.all(targetedFiles.map(readAsDataURL))
      .then((fileDatas) => {
        fileDatas.map(fileData => {
          setFiles(prevState => [...prevState, fileData]);
        });
      })
      .catch((error) => {
        toastError(error);
      })
  };

  const handleRemoveUpload = (imageIndex) => {
    const newArr = [...files];
    newArr.splice(imageIndex, 1);
    setFiles(newArr);
  }

  return {
    handleUpload,
    handleRemoveUpload,
    acceptedFileTypes,
  };
};

export default useUploader;