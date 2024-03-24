/* eslint-disable react/no-unescaped-entities */
const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen grow items-center justify-center overflow-hidden">
      <div className="page_not_found__container min-w-80 block px-4 py-10 pb-0 text-center md:m-auto lg:w-full lg:max-w-[1400px] xl:px-[72px]">
        <img src="/assets/images/not-found.png" alt="Not Found Page" className="object-cover" />
        <h1>Trang mà bạn đang tìm kiếm không tồn tại.</h1>
      </div>
    </div>
  );
};

export default NotFound;
