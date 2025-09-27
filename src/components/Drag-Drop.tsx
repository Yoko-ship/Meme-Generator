import "../App.css";
export const Drag_Drop: React.FC<{ imageHanlder: any }> = ({
  imageHanlder,
}) => {
  return (
    // <div className="image-container">
    <div className="upload-container">
      <input
        type="file"
        className="input-file"
        accept=".png, .jpg, .jpeg"
        onChange={imageHanlder}
        required
      />
      <p>Drag & Drop here or Click</p>
    </div>
    // </div>
  );
};
