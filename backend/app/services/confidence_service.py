def interpret_confidence(confidence: float):
    if confidence > 0.85:
        return "High confidence recommendation"
    if confidence > 0.7:
        return "Moderate confidence recommendation"
    return "Low confidence – conservative plan suggested"
