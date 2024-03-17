import {
  Badge,
  Box,
  Card,
  Checkbox,
  Grid,
  Group,
  ScrollArea,
  Text,
  TextInput,
  Textarea,
  Button,
} from '@mantine/core';

export default function MyDiary() {
  return (
    <Grid>
      <Grid.Col span={6} className="flex flex-col gap-2">
        <h3>Cảm xúc hiện tại của bạn thế nào?</h3>
        <Box className="flex w-full gap-2">
          <Checkbox.Group label="Tích cực:" size="md" className="h-full w-1/2">
            <Group mt="xs" className="flex flex-col items-start border-solid border-yellow-500 p-4">
              <Checkbox value="thich-thu" label="Thích thú" />
              <Checkbox value="svelte" label="Vui sướng" />
              <Checkbox value="vue" label="Phấn khởi" />
              <Checkbox value="ngd" label="Hạnh phúc" />
              <Checkbox value="ng" label="Lạc quan" />
            </Group>
          </Checkbox.Group>
          <Checkbox.Group label="Tiêu cực:" size="md" className="h-full w-1/2">
            <Group mt="xs" className="flex flex-col items-start border-solid border-blue-500 p-4">
              <Checkbox value="thich-thu" label="Mệt mỏi" />
              <Checkbox value="svelte" label="Lo lắng" />
              <Checkbox value="vue" label="Buồn bã" />
              <Checkbox value="ngd" label="Chán nản" />
              <Checkbox value="ng" label="Thất vọng" />
              <Checkbox value="ng" label="Căng thẳng" />
              <Checkbox value="ng" label="Bị áp lực" />
              <Checkbox value="ng" label="Chưa đoàn kết" />
            </Group>
          </Checkbox.Group>
        </Box>
        <Textarea size="md" label="Suy nghĩ" placeholder="Nhập suy nghĩ của bạn" />
        <TextInput size="md" label="Hashtag" placeholder="Nhập hashtag" mb="sm" />
        <Button variant="filled" className="w-fit">
          Cập nhật
        </Button>
      </Grid.Col>
      <Grid.Col span={6}>
        <ScrollArea h={500} className="flex flex-col">
          <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
            <Group className="flex justify-between" mb="xs">
              <Text fw={800} color="red">
                19/02
              </Text>
              <Text fw={800} color="red">
                20/03/2021
              </Text>
            </Group>

            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Bạn đang cảm thấy: </strong>
              <span>Hạnh phúc</span>
            </Text>
            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Lý do: </strong>
              <span>Các học viên có rất nhiều cố gắng trong hội thi</span>
            </Text>
            <Group justify="space-between" mt="xs">
              <Text size="sm" c="dimmed">
                <strong>Hashtag: </strong>
              </Text>
              <Badge color="blue">hoithaotieudoan</Badge>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
            <Group className="flex justify-between" mb="xs">
              <Text fw={800} color="red">
                19/02
              </Text>
              <Text fw={800} color="red">
                20/03/2021
              </Text>
            </Group>

            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Bạn đang cảm thấy: </strong>
              <span>Hạnh phúc</span>
            </Text>
            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Lý do: </strong>
              <span>Các học viên có rất nhiều cố gắng trong hội thi</span>
            </Text>
            <Group justify="space-between" mt="xs">
              <Text size="sm" c="dimmed">
                <strong>Hashtag: </strong>
              </Text>
              <Badge color="blue">hoithaotieudoan</Badge>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
            <Group className="flex justify-between" mb="xs">
              <Text fw={800} color="red">
                19/02
              </Text>
              <Text fw={800} color="red">
                20/03/2021
              </Text>
            </Group>

            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Bạn đang cảm thấy: </strong>
              <span>Hạnh phúc</span>
            </Text>
            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Lý do: </strong>
              <span>Các học viên có rất nhiều cố gắng trong hội thi</span>
            </Text>
            <Group justify="space-between" mt="xs">
              <Text size="sm" c="dimmed">
                <strong>Hashtag: </strong>
              </Text>
              <Badge color="blue">hoithaotieudoan</Badge>
            </Group>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
            <Group className="flex justify-between" mb="xs">
              <Text fw={800} color="red">
                19/02
              </Text>
              <Text fw={800} color="red">
                20/03/2021
              </Text>
            </Group>

            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Bạn đang cảm thấy: </strong>
              <span>Hạnh phúc</span>
            </Text>
            <Text size="sm" c="dimmed" mt="xs" mb="xs">
              <strong>Lý do: </strong>
              <span>Các học viên có rất nhiều cố gắng trong hội thi</span>
            </Text>
            <Group justify="space-between" mt="xs">
              <Text size="sm" c="dimmed">
                <strong>Hashtag: </strong>
              </Text>
              <Badge color="blue">hoithaotieudoan</Badge>
            </Group>
          </Card>
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}
