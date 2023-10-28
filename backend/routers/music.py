from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from db import get_db
from dependencies import get_account_id
from core.daos.spotify import SpotifyApiIdDao
from core.dtos.music import EnqueueReturnValue, GetMusicInfoReturnValue
from core.services.music import MusicService

router = APIRouter()


class PlayRequest(BaseModel):
    music_title: str = Field(..., title="楽曲のタイトル")


@router.post("/enqueue", name="キューに楽曲を追加", response_model=EnqueueReturnValue)
def enqueue(
    request: PlayRequest,
    db: Session = Depends(get_db),
    account_id: int = Depends(get_account_id)
) -> EnqueueReturnValue:
    # リクエスト情報取得
    music_title = request.music_title

    service = MusicService(
        db=db,
        spotify_api_id_dao=SpotifyApiIdDao(),
        account_id=account_id
    )
    return_value = service.enqueue(music_title)

    return return_value


@router.get("/get_music_info", name="楽曲の情報を取得", response_model=GetMusicInfoReturnValue)
def get_music_info(
    db: Session = Depends(get_db),
    account_id: int = Depends(get_account_id)
) -> GetMusicInfoReturnValue:
    service = MusicService(
        db=db,
        spotify_api_id_dao=SpotifyApiIdDao(),
        account_id=account_id
    )
    return_value = service.get_music_info()

    return return_value
