import { Badge, Card, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { Diary } from 'src/types/diary.type';

interface DiaryCardProps {
  data: Diary;
}

export default function DiaryCard({ data }: DiaryCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
      <Group className="flex justify-between" mb="xs">
        <Text fw={800} color="red">
          {dayjs(data.createdAt).format('DD/MM/YYYY')}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Bạn đang cảm thấy: </strong>
        <span>{data.reactionId}</span>
      </Text>
      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Lý do: </strong>
        <span>{data.description}</span>
      </Text>
      <Group className="flex gap-4" mt="xs">
        <Text size="sm" c="dimmed">
          <strong>Hashtag: </strong>
        </Text>
        <Badge color="blue">{data.hashtag}</Badge>
      </Group>
    </Card>
  );
}
