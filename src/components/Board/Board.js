import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function Board({ articleValues, setArticleValues, isUpdate }) {

  const handleContentChange = (content) => {
    setArticleValues((prev) => ({
      ...prev,
      articleContent: content
    }));
  };

  return (
    <ReactQuill
      value={articleValues.articleContent}
      onChange={handleContentChange}
      style={{ height: '500px', marginBottom: '40px' }}
      modules={modules}
      formats={formats}
    />
  )
}

export default Board;

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'link', 'image'
];