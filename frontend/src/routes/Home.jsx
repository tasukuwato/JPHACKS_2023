import { Box, TextField, ImageList, ImageListItem, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { PlayingSong } from '../components/PlayingSong';
import { SongWaitList } from '../components/SongWaitList';
import { PageTitle } from '../components/PageTitle';
import { CustomDivider } from '../components/CustomDivider';
import { customTextField } from '../styles/CustomTextField';
import { backendUrl } from '../config/backendUrl';
import { useCookies } from 'react-cookie';

export const Home = ({ images }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);

  var playingData = {};
  const getSongInfo = async () => {
    const header = {
      headers: {
        "Authorization": "Bearer " + cookies.access_token
      }
    }

    try {
      await axios.post(backendUrl + '/spotify/register', {
        spotify_client_id: "65052712c7f74f378e2017737d21f9d5",
        spotify_client_secret: "644fe09a07464d159010b7cc8387ec22"
      }, header);
    } catch (error) {
      console.log(error);
    }


    return await axios.get(backendUrl + '/music/get_music_info', header);
  }

  useEffect(() => {
    playingData = getSongInfo();
  }, [])

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PageTitle title={'Reserve Songs'} />

      { /* 楽曲検索などのテキストフィールド */}
      <TextField id="search-song" label="曲名を検索する" sx={customTextField} />
      <TextField id="search-artist" label="アーティストを検索す" sx={customTextField} />

      { /* 横並べで曲の画像を配置 */}
      <ImageList sx={{ overflowX: 'auto' }} rowHeight={200}>
        <ImageListItem sx={{ display: 'flex', flexDirection: 'row' }}>
          {images.map(image => {
            console.log(image);
            return (
              <img
                src={"./images/" + image}
                alt="title"
                loading='lazy'
                style={{ paddingRight: '1em' }}
              />
            )
          })}
        </ImageListItem>
      </ImageList>

      <PageTitle title={'Song List'} />

      <PlayingSong imgUrl={playingData.image_url} title={playingData.title} artist={playingData.artist_name} />

      { /* リストで待機している曲の情報 */}
      <CustomDivider />
      <SongWaitList images={images} />
      <CustomDivider />

      <Button variant="contained" color="tertiary" onClick={() => navigate('/edit')}>
        リストを編集する
      </Button>
    </Box>
  );
}