export type MicroserviceOptions =
    | GrpcOptions
    | RedisOptions
    | MqttOptions
    | RmqOptions
    | KafkaOptions
    | CustomStrategy;

/**
 * @publicApi
 */
export interface CustomStrategy {
    strategy: CustomTransportStrategy;
    options?: {};
}

/**
 * @publicApi
 */
export interface GrpcOptions {
    transport?: Transport.GRPC;
    options: {
        url?: string;
        maxSendMessageLength?: number;
        maxReceiveMessageLength?: number;
        maxMetadataSize?: number;
        keepalive?: {
            keepaliveTimeMs?: number;
            keepaliveTimeoutMs?: number;
            ..
            http2MinTimeBetweenPingsMs?: number;
            http2MinPingIntervalWithoutDataMs?: number;
            http2MaxPingStrikes?: number;
        };
        channelOptions?: ChannelOptions;
        credentials?: any;
        ...
        packageDefinition?: any;
        loader?: {
            keepCase?: boolean;
            alternateCommentMode?: boolean;
            longs?: Function;
            oneofs?: boolean;
            ...
            json?: boolean;
            includeDirs?: string[];
        };
    };
}

/**
 * @publicApi
 */
export interface RedisOptions {
    transport?: Transport.REDIS;
    options?: {
        host?: string;
        port?: number;
        retryAttempts?: number;
        retryDelay?: number;
        serializer?: Serializer;
        deserializer?: Deserializer;
    } & IORedisOptions;
}

/**
 * @publicApi
 */
export interface MqttOptions {
    transport?: Transport.MQTT;
    options?: MqttClientOptions & {
        url?: string;
        serializer?: Serializer;
        deserializer?: Deserializer;
        subscribeOptions?: {
            /**
             * The QoS
             */
            qos: QoS;
            /*
             * No local flag
             * */
            nl?: boolean;
            /*
             * Retain as Published flag
             * */
            rap?: boolean;
            /*
             * Retain Handling option
             * */
            rh?: number;
        };
        userProperties?: Record<string, string | string[]>;
    };
}


/**
 * @publicApi
 */
export interface KafkaOptions {
    transport?: Transport.KAFKA;
    options?: {
        /**
         * Defaults to `"-server"` on server side and `"-client"` on client side.
         */
        postfixId?: string;
        client?: KafkaConfig;
        consumer?: ConsumerConfig;
        run?: Omit<ConsumerRunConfig, 'eachBatch' | 'eachMessage'>;
        subscribe?: Omit<ConsumerSubscribeTopic, 'topic'>;
        producer?: ProducerConfig;
        send?: Omit<ProducerRecord, 'topic' | 'messages'>;
        serializer?: Serializer;
        deserializer?: Deserializer;
        parser?: KafkaParserConfig;
        producerOnlyMode?: boolean;
    };
}
