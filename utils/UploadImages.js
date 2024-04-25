import api from "../api";

export const uploadImagesHelper = async (images, postId, setIsUploading) => {
    // upload images
    images.forEach(image => {
        let uploadImageFormData = new FormData();
        uploadImageFormData.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        });
        uploadImageFormData.append('post_id', postId); // TODO: change placeholder
        console.debug('uploading image ' + image.uri);
        api
        .post('/posts/upload-post-image', uploadImageFormData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(r => {
            console.log('Successfully uploaded image. ');
        })
        .catch(e => {
            console.error(e.response.data);
        })
        .finally(() => {
            setIsUploading(false);
        });
    });

}
