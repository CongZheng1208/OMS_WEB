let reconnectTimer = null;

const MAX_RETRY_COUNT = 5;
const RETRY_INTERVAL = 5000;

const handleReconnect = (commit, dispatch, url) => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  if (this.state.retryCount < MAX_RETRY_COUNT) {
    reconnectTimer = setTimeout(() => {
      dispatch('initWebSocket', url);
      commit('incrementRetryCount');
    }, RETRY_INTERVAL);
  } else {
    // 达到最大重试次数，进行其他处理，比如提示用户或记录日志
  }
};

export default {
  namespaced: true,

  state: {
    ws: null,
    infoOMD: {},
    retryCount: 0
  },
  mutations: {
    setWebSocket(state, ws) {
      state.ws = ws;
    },
    incrementRetryCount(state) {
      state.retryCount++;
    },
    resetRetryCount(state) {
      state.retryCount = 0;
    },
    setInfoOMD(state, infoOMD) {
      state.infoOMD = infoOMD;

      console.log("setInfoOMD is used");
      console.log(infoOMD.path);
      console.log(infoOMD.query);

      // Check if infoOMD has changed
      // Vue.$router.replace({ path: infoOMD.path, query: infoOMD.query });
    }
  },
  actions: {
    initWebSocket({ commit, dispatch }, url) {
      console.log('WS init:', url);
      const ws = new WebSocket(url);

      ws.onopen = () => {
        commit('setWebSocket', ws);
        commit('resetRetryCount');
      };

      ws.onclose = () => {
        handleReconnect(commit, dispatch, url);
      };

      ws.onmessage = (event) => {
        console.log('Message received:', event.data);

        let infoOMD = JSON.parse(event.data);

        if (infoOMD.path && infoOMD.query) {
          commit('setInfoOMD', infoOMD);
        } else {
          console.error('Received message format is not correct.');
        }
      };

      ws.onerror = () => {
        // 处理连接错误
        console.error('Connection error.');
      };
    },

    sendWebSocketMessage({ state }, message) {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(message);
      } else {
        // 处理连接未准备就绪的情况
      }
    },
    closeWebSocket({ state }) {
      state.ws.close();
    }
  }
};
