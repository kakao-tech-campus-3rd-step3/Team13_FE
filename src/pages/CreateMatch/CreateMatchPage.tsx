import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoundedRectangleButton } from '@/components/button/variants';
import { DateTimePicker } from '@/components/dateTimePicker';
import {
  LocationDropDownWithInput,
  PlayerCountDropDown,
  SportsDropDown,
} from '@/components/dropDown';
import { ImageUploader } from '@/components/imageUploader';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { useCreateGame } from '@/hooks/mutations/games';
import type { CreateGameRequest } from '@/types/game.types';

import * as S from './CreateMatchPage.styled';

/**
 * 매치 생성 페이지
 * - 종목, 장소, 인원, 시작/종료 시간, 사진, 설명 입력
 * - 폼 검증 및 제출
 */
export default function CreateMatchPage() {
  const navigate = useNavigate();
  const { mutate: createGame, isPending } = useCreateGame();

  // 폼 상태
  const [sportId, setSportId] = useState<number | null>(null);
  const [location, setLocation] = useState<string>('');
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  // 에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 뒤로가기
  const handleBack = () => {
    void navigate(-1);
  };

  // 스포츠 종목 선택
  const handleSportChange = (selected: string) => {
    const id = selected === 'basketball' ? 1 : 2;
    setSportId(id);
    setErrors((prev: Record<string, string>) => ({ ...prev, sportId: '' }));
  };

  // 장소 선택
  const handleLocationChange = (selected: string | null) => {
    setLocation(selected ?? '');
    setErrors((prev: Record<string, string>) => ({ ...prev, location: '' }));
  };

  // 인원 수 선택
  const handlePlayerCountChange = (selected: string) => {
    setPlayerCount(Number(selected));
    setErrors((prev: Record<string, string>) => ({
      ...prev,
      playerCount: '',
    }));
  };

  // 시작 시간 선택
  const handleStartTimeChange = (date: Date | null) => {
    setStartTime(date);
    setErrors((prev: Record<string, string>) => ({ ...prev, startTime: '' }));

    // 종료 시간이 시작 시간보다 이전이면 초기화
    if (date && endTime && endTime <= date) {
      setEndTime(null);
    }
  };

  // 종료 시간 선택
  const handleEndTimeChange = (date: Date | null) => {
    setEndTime(date);
    setErrors((prev: Record<string, string>) => ({ ...prev, endTime: '' }));
  };

  // 이미지 선택
  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  // 설명 입력
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
    setErrors((prev: Record<string, string>) => ({
      ...prev,
      description: '',
    }));
  };

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!sportId) {
      newErrors.sportId = '종목을 선택해주세요.';
    }

    if (!location.trim()) {
      newErrors.location = '장소를 선택하거나 입력해주세요.';
    }

    if (!playerCount) {
      newErrors.playerCount = '인원 수를 선택해주세요.';
    } else if (playerCount < 2 || playerCount > 30) {
      newErrors.playerCount = '인원은 2~30명 사이여야 합니다.';
    }

    if (!startTime) {
      newErrors.startTime = '시작 시간을 선택해주세요.';
    } else if (startTime <= new Date()) {
      newErrors.startTime = '시작 시간은 현재 시간 이후여야 합니다.';
    }

    if (!endTime) {
      newErrors.endTime = '종료 시간을 선택해주세요.';
    } else if (startTime && endTime <= startTime) {
      newErrors.endTime = '종료 시간은 시작 시간 이후여야 합니다.';
    }

    if (!description.trim()) {
      newErrors.description = '매칭 설명을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // duration 계산 (분 단위)
    const duration = Math.floor(
      (endTime!.getTime() - startTime!.getTime()) / 1000 / 60,
    );

    // ISO 8601 형식으로 변환
    const startTimeISO = startTime!.toISOString();

    const gameData: CreateGameRequest = {
      sportId: sportId!,
      gameLocation: location,
      playerCount: playerCount!,
      startTime: startTimeISO,
      duration,
      description: description.trim(),
    };

    createGame(
      { game: gameData, image },
      {
        onSuccess: (data) => {
          alert('매칭이 성공적으로 생성되었습니다!');
          void navigate(`/matchDetail/${data.gameId}`);
        },
        onError: (error) => {
          alert(`매칭 생성에 실패했습니다: ${error.message}`);
        },
      },
    );
  };

  // 현재 시간 (시작 시간 최소값)
  const now = new Date();

  return (
    <S.PageContainer>
      {/* 타이틀바 */}
      <OriginTitleBar title="퀵 매치 만들기" onBack={handleBack} />

      {/* 폼 */}
      <S.FormContainer onSubmit={handleSubmit}>
        {/* 종목 선택 */}
        <S.FieldGroup>
          <S.FieldLabel>
            종목 선택 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <S.DropdownWrapper>
            <SportsDropDown onChange={handleSportChange} />
          </S.DropdownWrapper>
          {errors.sportId && (
            <S.ErrorMessage>⚠️ {errors.sportId}</S.ErrorMessage>
          )}
        </S.FieldGroup>

        {/* 시작 시간 */}
        <S.FieldGroup>
          <S.FieldLabel>
            시작 시간 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <DateTimePicker
            value={startTime}
            onChange={handleStartTimeChange}
            minDate={now}
            placeholder="시작 날짜와 시간을 선택해주세요"
          />
          {errors.startTime && (
            <S.ErrorMessage>⚠️ {errors.startTime}</S.ErrorMessage>
          )}
        </S.FieldGroup>

        {/* 종료 시간 */}
        <S.FieldGroup>
          <S.FieldLabel>
            종료 시간 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <DateTimePicker
            value={endTime}
            onChange={handleEndTimeChange}
            minDate={startTime ?? now}
            placeholder="종료 날짜와 시간을 선택해주세요"
            disabled={!startTime}
          />
          {errors.endTime && (
            <S.ErrorMessage>⚠️ {errors.endTime}</S.ErrorMessage>
          )}
          <S.HelperText>
            {startTime &&
              endTime &&
              `경기 시간: ${Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60)}분`}
          </S.HelperText>
        </S.FieldGroup>

        {/* 장소 선택 */}
        <S.FieldGroup>
          <S.FieldLabel>
            장소 선택 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <S.DropdownWrapper>
            <LocationDropDownWithInput onChange={handleLocationChange} />
          </S.DropdownWrapper>
          {errors.location && (
            <S.ErrorMessage>⚠️ {errors.location}</S.ErrorMessage>
          )}
        </S.FieldGroup>

        {/* 인원 수 선택 */}
        <S.FieldGroup>
          <S.FieldLabel>
            인원 수 선택 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <S.DropdownWrapper>
            <PlayerCountDropDown onChange={handlePlayerCountChange} />
          </S.DropdownWrapper>
          {errors.playerCount && (
            <S.ErrorMessage>⚠️ {errors.playerCount}</S.ErrorMessage>
          )}
        </S.FieldGroup>

        {/* 사진 업로드 */}
        <S.FieldGroup>
          <ImageUploader value={image} onChange={handleImageChange} />
        </S.FieldGroup>

        {/* 매칭 설명 */}
        <S.FieldGroup>
          <S.FieldLabel>
            매칭 설명 <S.RequiredMark>*</S.RequiredMark>
          </S.FieldLabel>
          <S.TextArea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="초보반, 매너 중요, 빠른 진행 등 매칭에 대한 설명을 입력해주세요"
            rows={5}
          />
          {errors.description && (
            <S.ErrorMessage>⚠️ {errors.description}</S.ErrorMessage>
          )}
        </S.FieldGroup>
      </S.FormContainer>

      {/* 작성 완료 버튼 */}
      <S.ButtonContainer>
        <RoundedRectangleButton
          size="lg"
          onClick={handleSubmit}
          disabled={isPending}
          colorSet={{
            background: '#369EFF',
            color: '#FFFFFF',
            hover: '#2A8AE6',
            active: '#1F76CC',
          }}
        >
          {isPending ? '생성 중...' : '작성 완료'}
        </RoundedRectangleButton>
      </S.ButtonContainer>
    </S.PageContainer>
  );
}
