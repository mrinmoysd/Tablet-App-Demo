import React from "react";
import { ScrollView, Text, View } from "react-native";

const ScrollViewVerticallySynced = ({name, color, style, onScroll, refe}) => {
    // const { name, color, style, onScroll, refe } = this.props;
    return (
      <ScrollView
        key={name}
        ref={refe}
        style={style}
        scrollEventThrottle={1}
        onScroll={onScroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {someRows(name, 25, color)}
      </ScrollView>
    );
}

const someRows = (name, rowCount, color) =>
  Array.from(Array(rowCount).keys()).map(index =>
    (<View
      key={`${name}-${index}`}
      style={{
        height: 50,
        backgroundColor: index % 2 === 0 ? color : 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>
        {name} R{index + 1}
      </Text>
    </View>),
  );

  export default ScrollViewVerticallySynced