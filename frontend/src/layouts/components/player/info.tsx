const Info = ({ cover, name, artist }: { cover: string; name: string; artist: string }) => {
  return (
    <div className={'info'}>
      <img src={cover} alt="cover" />
      <div className={'text'}>
        <div className={'name'}>{name}</div>
        <div className={'artist'}>{artist}</div>
      </div>
    </div>
  );
};

export default Info;
