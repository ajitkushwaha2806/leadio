import { SeverityNumber } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

let posthogLogEmitter;
let hasInitialized = false;

function getPostHogLogEmitter() {
    if (hasInitialized) {
        return posthogLogEmitter;
    }

    hasInitialized = true;

    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!token || !host) {
        if (process.env.NODE_ENV === "development") {
            const missingVariable = !token
                ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
                : "NEXT_PUBLIC_POSTHOG_HOST";
            throw new Error(
                `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
            );
        }

        return null;
    }

    const exporter = new OTLPLogExporter({
        url: `${host.replace(/\/$/, "")}/i/v1/logs`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const provider = new LoggerProvider({
        processors: [new BatchLogRecordProcessor(exporter)],
    });
    const logger = provider.getLogger("leadio-posthog-logs");

    posthogLogEmitter = async (event) => {
        try {
            logger.emit({
                body: event,
                severityNumber: SeverityNumber.INFO,
                severityText: "INFO",
                attributes: {
                    "log.source": "leadio.payment",
                },
            });
            await provider.forceFlush();
        } catch {
            // Logging must not affect the payment response.
        }
    };

    return posthogLogEmitter;
}

export async function capturePostHogLog(event) {
    const emit = getPostHogLogEmitter();

    if (emit) {
        await emit(event);
    }
}
