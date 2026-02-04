import { Button, Gauge, HStack, Section, Slider, Text, VStack } from "@expo/ui/swift-ui";
import { font, foregroundStyle, frame, gaugeStyle, tint } from "@expo/ui/swift-ui/modifiers";
import React, { use } from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./types";

export function DashboardSection() {
  const { tasks, productivityScore, setProductivityScore, focusLevel, setFocusLevel } = use(AppContext) as AppState;

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const highPriorityTasks = tasks.filter((t) => t.priority === "high" && !t.completed).length;
  const urgentTasksRate = totalTasks > 0 ? highPriorityTasks / totalTasks : 0;

  return (
    <Section title="📊 Performance Dashboard">
      <VStack spacing={20}>
        {/* Task Metrics Row */}
        <VStack spacing={12}>
          <Text modifiers={[font({ size: 16 })]}>Task Completion Metrics</Text>
          <HStack spacing={16}>
            <Gauge
              value={completionRate}
              modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("circular"), tint("green")]}
            >
              <Text modifiers={[font({ size: 16 })]}>{`${Math.round(completionRate * 100)}%`}</Text>
            </Gauge>
            <VStack spacing={4} alignment="leading">
              <Text modifiers={[font({ size: 14 })]}>Completion Rate</Text>
              <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>
                {`${completedTasks} of ${totalTasks} completed`}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Gauge Variants Showcase */}
        <VStack spacing={12}>
          <Text modifiers={[font({ size: 16 })]}>Gauge Component Variants</Text>

          {/* Circular Gauges */}
          <HStack spacing={16}>
            <VStack spacing={8} alignment="center">
              <Gauge
                value={productivityScore}
                modifiers={[frame({ width: 80, height: 80 }), gaugeStyle("circular"), tint("blue")]}
              />
              <Text modifiers={[font({ size: 12 })]}>Circular</Text>
            </VStack>

            <VStack spacing={8} alignment="center">
              <Gauge
                value={focusLevel}
                modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("circularCapacity"), tint("purple")]}
              >
                <Text modifiers={[font({ size: 16 })]}>{`${Math.round(focusLevel * 100)}%`}</Text>
              </Gauge>
              <Text modifiers={[font({ size: 12 })]}>Circular Capacity</Text>
            </VStack>

            <VStack spacing={8} alignment="center">
              <Gauge
                value={urgentTasksRate}
                modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("circularCapacity"), tint("orange")]}
              >
                <Text modifiers={[font({ size: 16 })]}>{`${Math.round(urgentTasksRate * 100)}%`}</Text>
              </Gauge>
              <Text modifiers={[font({ size: 12 })]}>{`${highPriorityTasks}`}</Text>
            </VStack>
          </HStack>

          {/* Linear Gauges */}
          <VStack spacing={8}>
            <Text modifiers={[font({ size: 14 })]}>Linear Gauge Types</Text>

            <VStack spacing={4}>
              <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>Default Linear</Text>
              <Gauge
                value={completionRate}
                modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("automatic"), tint("green")]}
              />
            </VStack>

            <VStack spacing={4}>
              <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>Linear</Text>
              <Gauge value={productivityScore} modifiers={[frame({ width: 100, height: 100 }), tint("blue")]} />
            </VStack>

            <VStack spacing={4}>
              <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>Linear Capacity</Text>
              <Gauge
                value={focusLevel}
                modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("linearCapacity"), tint("purple")]}
              />
            </VStack>

            <VStack spacing={4}>
              <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>Gradient Linear</Text>
              <Gauge
                value={(productivityScore + focusLevel) / 2}
                modifiers={[frame({ width: 100, height: 100 }), gaugeStyle("linear"), tint("purple")]}
              />
            </VStack>
          </VStack>
        </VStack>

        {/* Interactive Sliders */}
        <VStack spacing={12}>
          <Text modifiers={[font({ size: 16 })]}>Interactive Controls</Text>

          <VStack spacing={8}>
            <HStack spacing={12} alignment="center">
              <Text modifiers={[font({ size: 14 })]}>Productivity Score:</Text>
              <Text modifiers={[font({ size: 14 }), foregroundStyle("blue")]}>
                {`${Math.round(productivityScore * 100)}%`}
              </Text>
            </HStack>
            <Slider value={productivityScore} onValueChange={setProductivityScore} />
          </VStack>

          <VStack spacing={8}>
            <HStack spacing={12} alignment="center">
              <Text modifiers={[font({ size: 14 })]}>Focus Level:</Text>
              <Text modifiers={[font({ size: 14 }), foregroundStyle("purple")]}>
                {`${Math.round(focusLevel * 100)}%`}
              </Text>
            </HStack>
            <Slider value={focusLevel} onValueChange={setFocusLevel} />
          </VStack>
        </VStack>

        {/* Action Buttons */}
        <VStack spacing={8}>
          <Text modifiers={[font({ size: 16 })]}>Quick Actions</Text>
          <HStack spacing={12}>
            <Button
              onPress={() => {
                setProductivityScore(Math.random());
                setFocusLevel(Math.random());
              }}
              systemImage="shuffle"
              label="Randomize"
            />
          </HStack>
        </VStack>
      </VStack>
    </Section>
  );
}
