import notFound from '../../assets/images/Not-Found.png'
export default function Notfound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={notFound}></img>
    </div>
  );
}